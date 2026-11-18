/**
 * Rules for a tuition fee payment schedule, mirroring the API: each
 * installment plan appears once, every share is above 0%, the shares total
 * exactly 100%, and due dates fall within the academic year in installment
 * order. Amounts are never stored; they are a percentage of the tuition.
 */

import { format, isValid, parseISO } from "date-fns";

export const TOTAL_PERCENTAGE = 100;
const TOLERANCE = 0.01;

const toDateOnly = (value) => (value ? String(value).slice(0, 10) : "");

/** "1 Oct 2026" for a YYYY-MM-DD (or ISO) date, "-" when missing. */
export const formatScheduleDate = (value) => {
  const date = value ? parseISO(String(value).slice(0, 10)) : null;
  return date && isValid(date) ? format(date, "d MMM yyyy") : "-";
};

/** True for a complete YYYY-MM-DD date (masked inputs report partial ones like "2026-1_-__"). */
export const isCompleteDate = (value) =>
  /^\d{4}-\d{2}-\d{2}$/.test(String(value ?? "")) && isValid(parseISO(String(value)));

/** The day after a YYYY-MM-DD date, or null when it is not a complete date. */
export const nextDay = (value) => {
  if (!isCompleteDate(value)) return null;
  const date = parseISO(String(value));
  date.setDate(date.getDate() + 1);
  return format(date, "yyyy-MM-dd");
};

export const roundTo2 = (value) => Math.round((Number(value) || 0) * 100) / 100;

export const amountFor = (tuitionFee, percentage) =>
  roundTo2(((Number(tuitionFee) || 0) * (Number(percentage) || 0)) / 100);

export const totalPercentage = (rows) =>
  roundTo2(rows.reduce((sum, row) => sum + (Number(row.fee_percentage) || 0), 0));

/** Rows ordered by their installment plan (1st, 2nd, …). */
export const sortRows = (rows) =>
  [...rows].sort((a, b) => (a.installment?.count ?? 0) - (b.installment?.count ?? 0));

/**
 * Checks the whole schedule.
 * Returns { rowErrors: { [installment_id]: { due_date?, fee_percentage? } },
 *           problems: string[], total, isValid }.
 */
export function validateSchedule(rows, { startDate, endDate } = {}) {
  const start = toDateOnly(startDate);
  const end = toDateOnly(endDate);
  const ordered = sortRows(rows);
  const rowErrors = {};
  const problems = [];
  const setError = (row, field, message) => {
    rowErrors[row.installment_id] = { ...rowErrors[row.installment_id], [field]: message };
  };

  if (ordered.length === 0) problems.push("Add at least one installment.");

  ordered.forEach((row, index) => {
    const date = toDateOnly(row.due_date);
    const percentage = Number(row.fee_percentage);

    if (!date) setError(row, "due_date", "Pick a due date.");
    else if (!isCompleteDate(date)) setError(row, "due_date", "Enter the full due date (YYYY-MM-DD).");
    else if ((start && date < start) || (end && date > end))
      setError(row, "due_date", "Must fall within the academic year.");
    else if (index > 0) {
      const previous = toDateOnly(ordered[index - 1].due_date);
      if (previous && date <= previous)
        setError(row, "due_date", `Must be after the ${ordered[index - 1].installment?.name ?? "previous installment"}.`);
    }

    if (row.fee_percentage === "" || row.fee_percentage == null)
      setError(row, "fee_percentage", "Enter a percentage.");
    else if (!(percentage > 0)) setError(row, "fee_percentage", "Must be more than 0%.");
    else if (percentage > TOTAL_PERCENTAGE) setError(row, "fee_percentage", "Cannot exceed 100%.");
  });

  const total = totalPercentage(ordered);
  if (ordered.length > 0 && Math.abs(total - TOTAL_PERCENTAGE) > TOLERANCE) {
    problems.push(
      total < TOTAL_PERCENTAGE
        ? `${roundTo2(TOTAL_PERCENTAGE - total)}% of the tuition is not allocated yet.`
        : `Installments exceed the tuition by ${roundTo2(total - TOTAL_PERCENTAGE)}%.`,
    );
  }

  const fieldProblems = Object.keys(rowErrors).length;
  if (fieldProblems > 0)
    problems.unshift(
      fieldProblems === 1 ? "1 installment needs attention." : `${fieldProblems} installments need attention.`,
    );

  return { rowErrors, problems, total, isValid: problems.length === 0 };
}

/**
 * Splits the tuition evenly across the rows and spreads the due dates evenly
 * over the academic year, the first due on its start date. The last
 * installment absorbs rounding so the shares total exactly 100%.
 */
export function splitEvenly(rows, { startDate, endDate } = {}) {
  const ordered = sortRows(rows);
  const count = ordered.length;
  if (count === 0) return rows;

  const share = Math.floor((TOTAL_PERCENTAGE / count) * 100) / 100;
  const start = startDate ? new Date(`${toDateOnly(startDate)}T00:00:00`) : null;
  const end = endDate ? new Date(`${toDateOnly(endDate)}T00:00:00`) : null;
  const span = start && end ? end.getTime() - start.getTime() : 0;

  return ordered.map((row, index) => {
    const percentage =
      index === count - 1 ? roundTo2(TOTAL_PERCENTAGE - share * (count - 1)) : share;
    let due = row.due_date;
    if (start && end) {
      const date = new Date(start.getTime() + (span * index) / count);
      due = [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, "0"),
        String(date.getDate()).padStart(2, "0"),
      ].join("-");
    }
    return { ...row, fee_percentage: String(percentage), due_date: due };
  });
}

/** True when two schedules hold the same installments, dates and shares. */
export function sameSchedule(a, b) {
  const key = (rows) =>
    JSON.stringify(
      sortRows(rows).map((row) => [row.installment_id, toDateOnly(row.due_date), roundTo2(row.fee_percentage)]),
    );
  return key(a) === key(b);
}

/** The request body the API expects. */
export const toSlotPayload = (rows) =>
  sortRows(rows).map((row) => ({
    ...(row.slot_id ? { slot_id: row.slot_id } : {}),
    installment_id: row.installment_id,
    due_date: toDateOnly(row.due_date),
    fee_percentage: roundTo2(row.fee_percentage),
  }));

/**
 * Filter operators and evaluation shared by every data table.
 *
 * Column types are detected from the row data rather than colDefs, because
 * most colDefs leave `cellDataType` unset and AG Grid only infers it at
 * runtime.
 */

export const OPERATORS = {
  text: [
    { value: "contains", label: "contains" },
    { value: "doesNotContain", label: "does not contain" },
    { value: "equals", label: "is" },
    { value: "doesNotEqual", label: "is not" },
    { value: "isAnyOf", label: "is any of", multi: true },
    { value: "beginsWith", label: "starts with" },
    { value: "endsWith", label: "ends with" },
    { value: "blank", label: "is empty", noValue: true },
    { value: "notBlank", label: "is not empty", noValue: true },
  ],
  number: [
    { value: "equals", label: "=" },
    { value: "doesNotEqual", label: "≠" },
    { value: "greaterThan", label: ">" },
    { value: "greaterThanOrEqual", label: "≥" },
    { value: "lessThan", label: "<" },
    { value: "lessThanOrEqual", label: "≤" },
    { value: "between", label: "is between", range: true },
    { value: "blank", label: "is empty", noValue: true },
    { value: "notBlank", label: "is not empty", noValue: true },
  ],
  date: [
    { value: "on", label: "is on" },
    { value: "notOn", label: "is not on" },
    { value: "before", label: "is before" },
    { value: "after", label: "is after" },
    { value: "between", label: "is between", range: true },
    { value: "blank", label: "is empty", noValue: true },
    { value: "notBlank", label: "is not empty", noValue: true },
  ],
  boolean: [
    { value: "isTrue", label: "is yes", noValue: true },
    { value: "isFalse", label: "is no", noValue: true },
  ],
};

export const defaultOperator = (type) =>
  ({ text: "contains", number: "equals", date: "on", boolean: "isTrue" })[
    type
  ] ?? "contains";

export const operatorFor = (type, value) =>
  (OPERATORS[type] ?? OPERATORS.text).find((op) => op.value === value);

/* -------------------------------------------------------------------------- */
/* Type detection                                                             */
/* -------------------------------------------------------------------------- */

const DATE_PATTERN =
  /^\d{4}-\d{2}-\d{2}([ T]\d{2}:\d{2}(:\d{2}(\.\d+)?)?(Z|[+-]\d{2}:?\d{2})?)?$/;

const isBlank = (value) =>
  value === null || value === undefined || String(value).trim() === "";

const valueType = (value) => {
  if (typeof value === "boolean") return "boolean";
  if (typeof value === "number") return "number";
  if (typeof value === "string") {
    if (DATE_PATTERN.test(value.trim())) return "date";
    return "text";
  }
  return null;
};

/** Detect a column's type from up to 50 non-empty sample values. */
export const detectType = (values, declared) => {
  if (declared === "number") return "number";
  if (declared === "boolean") return "boolean";
  if (declared === "date" || declared === "dateString") return "date";

  const samples = values.filter((value) => !isBlank(value)).slice(0, 50);
  if (!samples.length) return "text";
  const types = new Set(samples.map(valueType));
  if (types.size === 1) {
    const [only] = types;
    return only ?? "text";
  }
  return "text";
};

/** Distinct display values, used for the "is any of" picker. */
export const distinctValues = (values, limit = 40) => {
  const seen = new Map();
  values.forEach((value) => {
    if (isBlank(value)) return;
    const key = String(value);
    if (!seen.has(key)) seen.set(key, key);
  });
  if (seen.size > limit) return null;
  return [...seen.values()].sort((a, b) => a.localeCompare(b));
};

/* -------------------------------------------------------------------------- */
/* Evaluation                                                                 */
/* -------------------------------------------------------------------------- */

const toDay = (value) => {
  if (isBlank(value)) return null;
  // Read the calendar date from the string so time zones can't shift it.
  const ymd = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(value).trim());
  if (ymd) return Date.UTC(Number(ymd[1]), Number(ymd[2]) - 1, Number(ymd[3]));
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
};

const toNumber = (value) => {
  if (isBlank(value)) return null;
  const number = typeof value === "number" ? value : Number(value);
  return Number.isNaN(number) ? null : number;
};

/** True when the operator has everything it needs to run. */
export const isConditionComplete = (condition, type) => {
  if (!condition?.field || !condition?.match) return false;
  const op = operatorFor(type, condition.match);
  if (!op) return false;
  if (op.noValue) return true;
  if (op.multi)
    return Array.isArray(condition.value) && condition.value.length > 0;
  if (op.range) {
    return !isBlank(condition.value?.from) && !isBlank(condition.value?.to);
  }
  return !isBlank(condition.value);
};

export const matches = (cellValue, type, match, value) => {
  if (match === "blank") return isBlank(cellValue);
  if (match === "notBlank") return !isBlank(cellValue);

  if (type === "boolean") {
    const truthy =
      cellValue === true ||
      String(cellValue).toLowerCase() === "true" ||
      cellValue === 1;
    return match === "isTrue" ? truthy : !truthy;
  }

  if (type === "number") {
    const cell = toNumber(cellValue);
    if (cell === null) return false;
    if (match === "between") {
      const from = toNumber(value?.from);
      const to = toNumber(value?.to);
      return cell >= Math.min(from, to) && cell <= Math.max(from, to);
    }
    const target = toNumber(value);
    switch (match) {
      case "equals":
        return cell === target;
      case "doesNotEqual":
        return cell !== target;
      case "greaterThan":
        return cell > target;
      case "greaterThanOrEqual":
        return cell >= target;
      case "lessThan":
        return cell < target;
      case "lessThanOrEqual":
        return cell <= target;
      default:
        return true;
    }
  }

  if (type === "date") {
    const cell = toDay(cellValue);
    if (cell === null) return false;
    if (match === "between") {
      const from = toDay(value?.from);
      const to = toDay(value?.to);
      return cell >= Math.min(from, to) && cell <= Math.max(from, to);
    }
    const target = toDay(value);
    switch (match) {
      case "on":
        return cell === target;
      case "notOn":
        return cell !== target;
      case "before":
        return cell < target;
      case "after":
        return cell > target;
      default:
        return true;
    }
  }

  // text
  const cell = isBlank(cellValue) ? "" : String(cellValue).toLowerCase();
  if (match === "isAnyOf") {
    return (value ?? []).some(
      (option) => String(option).toLowerCase() === cell,
    );
  }
  const target = String(value ?? "").toLowerCase();
  switch (match) {
    case "contains":
      return cell.includes(target);
    case "doesNotContain":
      return !cell.includes(target);
    case "equals":
      return cell === target;
    case "doesNotEqual":
      return cell !== target;
    case "beginsWith":
      return cell.startsWith(target);
    case "endsWith":
      return cell.endsWith(target);
    default:
      return true;
  }
};

/**
 * Build a row predicate from the toolbar chips (always AND) and the panel
 * conditions (AND or OR). Returns null when nothing is active.
 *
 * `getValue(row, field)` reads a cell; `typeOf(field)` returns its type.
 */
export const buildPredicate = ({
  columnFilters,
  conditions,
  logic,
  getValue,
  typeOf,
}) => {
  const chips = Object.entries(columnFilters ?? {})
    .map(([field, filter]) => ({ field, ...filter }))
    .filter((chip) => isConditionComplete(chip, typeOf(chip.field)));
  const rules = (conditions ?? []).filter((condition) =>
    isConditionComplete(condition, typeOf(condition.field)),
  );
  if (!chips.length && !rules.length) return null;

  const test = (row, rule) =>
    matches(
      getValue(row, rule.field),
      typeOf(rule.field),
      rule.match,
      rule.value,
    );

  return (row) => {
    if (!chips.every((chip) => test(row, chip))) return false;
    if (!rules.length) return true;
    return logic === "or"
      ? rules.some((rule) => test(row, rule))
      : rules.every((rule) => test(row, rule));
  };
};

/** Short human-readable summary of a condition, e.g. "Status is any of 2". */
export const describeValue = (condition, type) => {
  const op = operatorFor(type, condition.match);
  if (!op || op.noValue) return "";
  if (op.multi) {
    const values = condition.value ?? [];
    return values.length <= 2 ? values.join(", ") : `${values.length} values`;
  }
  if (op.range) return `${condition.value?.from} – ${condition.value?.to}`;
  return String(condition.value ?? "");
};

import { Icon } from "@iconify/react";
import { Dot, Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import StatusPill from "../../components/Election/StatusPill";
import FormErrorBanner from "../../components/errors/FormErrorBanner";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useFormError } from "../../hooks/form/useFormError";
import {
  amountFor,
  formatScheduleDate,
  sameSchedule,
  sortRows,
  splitEvenly,
  TOTAL_PERCENTAGE,
  toSlotPayload,
  validateSchedule,
} from "../../utils/feeSchedule/scheduleRules";
import { formatNumber } from "../../utils/functions";

const useCurrencySymbol = () =>
  useSelector((state) => state.auth.user?.schoolDetails?.school?.country?.currency) || "";

/** A blank row for an installment plan. */
export const rowForInstallment = (installment) => ({
  slot_id: null,
  installment_id: installment.id,
  installment: { id: installment.id, name: installment.name, count: Number(installment.count) },
  due_date: "",
  fee_percentage: "",
});

/** What the schedule is for: specialty, level, academic year, tuition and dates. */
export function FeeScheduleSummary({ schedule, installmentCount }) {
  const currency = useCurrencySymbol();
  const facts = [
    { icon: "solar:wallet-money-linear", value: `${formatNumber(Number(schedule?.tuition_fee) || 0)} ${currency}`, label: "Tuition" },
    {
      icon: "solar:calendar-linear",
      value: `${formatScheduleDate(schedule?.start_date)} – ${formatScheduleDate(schedule?.end_date)}`,
      label: null,
    },
    ...(installmentCount != null
      ? [{ icon: "solar:layers-minimalistic-linear", value: installmentCount, label: installmentCount === 1 ? "Installment" : "Installments" }]
      : []),
  ];

  return (
    <div className="d-flex flex-column gap-2 font-size-sm">
      <div className="d-flex flex-row align-items-center gap-2">
        <div
          style={{ width: "2.5rem", height: "2.5rem", display: "grid", placeItems: "center" }}
          className="bg-primary-50 rounded-2 text-primary-500 flex-shrink-0"
        >
          <Icon icon="solar:bill-list-linear" width={20} height={20} />
        </div>
        <div className="d-flex flex-column flex-grow-1" style={{ minWidth: 0 }}>
          <div className="d-flex flex-row align-items-center gap-2">
            <span className="fw-semibold text-truncate" title={schedule?.specialty_name}>
              {schedule?.specialty_name ?? "Specialty"}
            </span>
            {schedule?.academic_year && <StatusPill tone="primary">{schedule.academic_year}</StatusPill>}
          </div>
          <div className="d-flex flex-row align-items-center text-iron-400 fw-light">
            <span>{schedule?.level_name ?? "-"}</span>
            <Dot size={16} />
            <span className="text-truncate">{schedule?.department_name ?? "-"}</span>
          </div>
        </div>
      </div>
      <div className="d-flex flex-row flex-wrap align-items-center gap-3 font-size-xs text-iron-500">
        {facts.map((fact) => (
          <div key={fact.icon} className="d-flex flex-row align-items-center gap-1">
            <Icon icon={fact.icon} width={14} height={14} />
            <span className="fw-semibold text-iron-700">{fact.value}</span>
            {fact.label && <span>{fact.label}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

/** How much of the tuition the installments cover, with a one-click even split. */
function AllocationMeter({ total, onSplitEvenly, canSplit }) {
  const over = total > TOTAL_PERCENTAGE + 0.001;
  const complete = Math.abs(total - TOTAL_PERCENTAGE) <= 0.01;
  const tone = complete ? "bg-fern-500" : over ? "bg-red-500" : "bg-primary-500";
  const helper = complete
    ? "The full tuition is allocated."
    : over
      ? `${formatNumber(total - TOTAL_PERCENTAGE, 2)}% over the tuition. Reduce a share.`
      : `${formatNumber(TOTAL_PERCENTAGE - total, 2)}% left to allocate.`;

  return (
    <div className="d-flex flex-column gap-1 font-size-sm">
      <div className="d-flex flex-row align-items-center justify-content-between">
        <span className="text-iron-500">
          Allocated <span className="fw-semibold text-iron-700">{formatNumber(total, 2)}%</span> of 100%
        </span>
        <button
          type="button"
          className="border rounded-3 bg-white font-size-xs px-2 py-1 d-flex flex-row align-items-center gap-1 color-primary"
          onClick={onSplitEvenly}
          disabled={!canSplit}
          title="Share the tuition equally and spread the due dates across the academic year"
        >
          <Icon icon="solar:magic-stick-3-linear" width={14} height={14} />
          Split evenly
        </button>
      </div>
      <div
        className="progress bg-iron-100"
        style={{ height: 6 }}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.min(total, 100)}
        aria-label="Tuition allocated"
      >
        <div className={`progress-bar ${tone}`} style={{ width: `${Math.min(total, 100)}%` }} />
      </div>
      <span className={`font-size-xs ${complete ? "text-fern-600" : over ? "text-red-600" : "text-iron-400"}`}>
        {helper}
      </span>
    </div>
  );
}

function InstallmentRow({ row, error, tuitionFee, bounds, canRemove, onChange, onRemove }) {
  const currency = useCurrencySymbol();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const inputClass = `form-control font-size-sm p-2 ${darkMode ? "dark-mode-input" : ""}`;
  const hasError = Boolean(error?.due_date || error?.fee_percentage);
  const dateId = `due-${row.installment_id}`;
  const percentageId = `share-${row.installment_id}`;

  return (
    <div className={`border rounded-3 p-2 d-flex flex-column gap-2 ${hasError ? "border-red-300" : ""}`}>
      <div className="d-flex flex-row align-items-center gap-2 font-size-sm">
        <span
          className="bg-primary-50 text-primary-600 rounded-circle fw-semibold font-size-xs flex-shrink-0"
          style={{ width: "1.5rem", height: "1.5rem", display: "grid", placeItems: "center" }}
          aria-hidden="true"
        >
          {row.installment?.count ?? "•"}
        </span>
        <span className="fw-semibold text-truncate flex-grow-1">{row.installment?.name}</span>
        <span className="text-iron-600 text-nowrap">
          {formatNumber(amountFor(tuitionFee, row.fee_percentage), 2)} {currency}
        </span>
        <button
          type="button"
          className="border-none bg-none text-iron-400 p-1 rounded-2"
          onClick={onRemove}
          disabled={!canRemove}
          aria-label={`Remove ${row.installment?.name}`}
          title={canRemove ? "Remove installment" : "A schedule needs at least one installment"}
          style={{ opacity: canRemove ? 1 : 0.4 }}
        >
          <Trash2 size={15} />
        </button>
      </div>
      <div className="row g-2">
        <div className="col-7 d-flex flex-column gap-1">
          <label htmlFor={dateId} className="font-size-xs text-iron-500 m-0">
            Due date
          </label>
          <input
            id={dateId}
            type="date"
            className={`${inputClass} ${error?.due_date ? "is-invalid" : ""}`}
            value={row.due_date || ""}
            min={bounds.start}
            max={bounds.end}
            onChange={(e) => onChange("due_date", e.target.value)}
          />
          {error?.due_date && <span className="font-size-xs text-red-600">{error.due_date}</span>}
        </div>
        <div className="col-5 d-flex flex-column gap-1">
          <label htmlFor={percentageId} className="font-size-xs text-iron-500 m-0">
            Share of tuition
          </label>
          <div className="input-group">
            <input
              id={percentageId}
              type="number"
              inputMode="decimal"
              step="0.01"
              min="0"
              max="100"
              placeholder="0"
              className={`${inputClass} ${error?.fee_percentage ? "is-invalid" : ""}`}
              value={row.fee_percentage}
              onChange={(e) => onChange("fee_percentage", e.target.value)}
            />
            <span className="input-group-text font-size-sm bg-iron-50 text-iron-500">%</span>
          </div>
          {error?.fee_percentage && <span className="font-size-xs text-red-600">{error.fee_percentage}</span>}
        </div>
      </div>
    </div>
  );
}

/** Loading layout matching the editor: summary, meter and installment rows. */
export function FeeScheduleEditorSkeleton() {
  return (
    <div className="d-flex flex-column gap-3 p-2">
      <RectangleSkeleton height="3.5rem" />
      <RectangleSkeleton height="2.5rem" />
      {[0, 1, 2].map((key) => (
        <RectangleSkeleton key={key} height="6.5rem" />
      ))}
    </div>
  );
}

/**
 * Edits a whole payment schedule: one row per installment plan with its due
 * date and share of the tuition. Used by the create and edit drawers.
 *
 *   mode: "create" | "update"
 *   initialRows: rows to start from (see rowForInstallment)
 *   installments: the active installment plans that can be added
 *   onSave(payload, { onError }): sends the slots to the API
 */
export default function FeeScheduleEditor({
  schedule,
  mode,
  initialRows,
  installments,
  onSave,
  isSaving,
  handleClose,
}) {
  const [rows, setRows] = useState(() => sortRows(initialRows));
  const [touched, setTouched] = useState(() => new Set());
  const [attempted, setAttempted] = useState(false);
  const { formError, errorBannerRef, handleServerError, setClientError, clearFormError } = useFormError(
    mode === "create" ? "Failed To Create Fee Schedule" : "Failed To Update Fee Schedule",
  );

  const bounds = useMemo(
    () => ({ start: String(schedule?.start_date ?? "").slice(0, 10), end: String(schedule?.end_date ?? "").slice(0, 10) }),
    [schedule],
  );
  const { rowErrors, problems, total, isValid } = useMemo(
    () => validateSchedule(rows, { startDate: bounds.start, endDate: bounds.end }),
    [rows, bounds],
  );
  const isDirty = useMemo(() => !sameSchedule(rows, initialRows), [rows, initialRows]);

  const usedIds = new Set(rows.map((row) => row.installment_id));
  const nextInstallment = sortRows(
    installments.filter((installment) => !usedIds.has(installment.id)).map(rowForInstallment),
  )[0];

  const edit = (updater) => {
    clearFormError();
    setRows((current) => sortRows(updater(current)));
  };

  const updateRow = (installmentId, field, value) => {
    setTouched((current) => new Set(current).add(installmentId));
    edit((current) => current.map((row) => (row.installment_id === installmentId ? { ...row, [field]: value } : row)));
  };

  const removeRow = (installmentId) =>
    edit((current) => current.filter((row) => row.installment_id !== installmentId));

  const addRow = () => nextInstallment && edit((current) => [...current, nextInstallment]);

  const handleSplitEvenly = () => {
    setTouched(new Set(rows.map((row) => row.installment_id)));
    edit((current) => splitEvenly(current, { startDate: bounds.start, endDate: bounds.end }));
  };

  const handleSave = () => {
    if (!isValid) {
      setAttempted(true);
      setClientError("This schedule is not ready yet", problems);
      return;
    }
    clearFormError();
    onSave(toSlotPayload(rows), { onError: handleServerError });
  };

  const showErrorsFor = (row) => attempted || touched.has(row.installment_id);
  const saveLabel = mode === "create" ? "Create Schedule" : "Save Changes";
  const canSave = !isSaving && (mode === "create" || isDirty);

  return (
    <>
      <div className="d-flex flex-column gap-3 pt-2 px-2 pb-2 flex-shrink-0">
        <FeeScheduleSummary schedule={schedule} installmentCount={rows.length} />
        <AllocationMeter total={total} onSplitEvenly={handleSplitEvenly} canSplit={rows.length > 0} />
      </div>

      <div className="drawer-content px-2 pb-3 d-flex flex-column gap-2">
        <FormErrorBanner ref={errorBannerRef} error={formError} onDismiss={clearFormError} className="mb-1" />
        {rows.map((row) => (
          <InstallmentRow
            key={row.installment_id}
            row={row}
            error={showErrorsFor(row) ? rowErrors[row.installment_id] : undefined}
            tuitionFee={schedule?.tuition_fee}
            bounds={bounds}
            canRemove={rows.length > 1}
            onChange={(field, value) => updateRow(row.installment_id, field, value)}
            onRemove={() => removeRow(row.installment_id)}
          />
        ))}
        {nextInstallment && (
          <button
            type="button"
            className="border border-dashed rounded-3 bg-none w-100 py-2 font-size-sm color-primary d-flex flex-row align-items-center justify-content-center gap-1"
            onClick={addRow}
          >
            <Plus size={15} />
            Add {nextInstallment.installment.name}
          </button>
        )}
      </div>

      <div className="drawer-footer">
        <div className="d-flex flex-column w-100 font-size-sm">
          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.5} />
          <div className="d-flex flex-row align-items-center justify-content-between gap-3 p-2">
            <button type="button" className="border-none bg-none" onClick={() => handleClose?.()}>
              Cancel
            </button>
            <div className="d-flex flex-row align-items-center gap-3" style={{ minWidth: 0 }}>
              <span
                className={`text-truncate ${isValid && (mode === "create" || isDirty) ? "text-fern-600" : "text-iron-500"}`}
                title={isValid ? undefined : problems[0]}
              >
                {isValid
                  ? mode === "update" && !isDirty
                    ? "No changes yet"
                    : "Ready to save"
                  : problems[0]}
              </span>
              <button
                type="button"
                className="border-none rounded-3 primary-background text-white font-size-sm px-3 py-2 flex-shrink-0"
                onClick={handleSave}
                disabled={!canSave}
                style={{ opacity: canSave ? 1 : 0.6 }}
              >
                {isSaving ? <SingleSpinner /> : saveLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

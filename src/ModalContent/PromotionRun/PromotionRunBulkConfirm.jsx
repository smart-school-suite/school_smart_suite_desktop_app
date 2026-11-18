import ChipRow from "../../components/Card/ChipRow";
import ConfirmDialog from "../../components/Modals/ConfirmDialog";
import { useFormError } from "../../hooks/form/useFormError";

/**
 * The selected runs, whichever way the dialog was opened: the toast's
 * dropdown passes rowData.selectedRuns, its icon button (ModalButton) passes
 * bulkData.
 */
export const selectedPromotionRuns = (rowData, bulkData) =>
  rowData?.selectedRuns ?? (Array.isArray(bulkData) ? bulkData : bulkData?.selectedRuns) ?? [];

export const runLabel = (run) =>
  [run?.specialty, run?.level_name, run?.academic_year].filter(Boolean).join(" · ") || "Promotion run";

/** Splits runs by whether the server says the action is allowed (run.available_actions). */
export const partitionRuns = (runs, action) => ({
  eligible: runs.filter((run) => run?.available_actions?.[action]?.allowed),
  skipped: runs.filter((run) => !run?.available_actions?.[action]?.allowed),
});

/**
 * Confirmation for a bulk promotion run action: which selected runs it will
 * apply to, which are skipped and why, and the server error if it fails.
 * The server re-checks every run when the action is sent.
 */
export default function PromotionRunBulkConfirm({
  runs,
  action,
  title,
  icon,
  tone,
  description,
  confirmLabel,
  errorTitle,
  mutate,
  isPending,
  handleClose,
  buildPayload = (ids) => ({ promotion_run_ids: ids }),
  canConfirm = true,
  children,
}) {
  const { formError, errorBannerRef, handleServerError, clearFormError } = useFormError(errorTitle);
  const { eligible, skipped } = partitionRuns(runs, action);

  const handleConfirm = () => {
    clearFormError();
    mutate(buildPayload(eligible.map((run) => run.id)), { onError: handleServerError });
  };

  return (
    <ConfirmDialog
      title={title}
      icon={icon}
      tone={tone}
      description={description}
      confirmLabel={eligible.length > 1 ? `${confirmLabel} ${eligible.length} Runs` : confirmLabel}
      onConfirm={handleConfirm}
      onCancel={handleClose}
      isPending={isPending}
      confirmDisabled={eligible.length === 0 || !canConfirm}
      error={formError}
      errorRef={errorBannerRef}
      onDismissError={clearFormError}
    >
      <div className="d-flex flex-column gap-2">
        <span className="font-size-xs text-iron-500">
          {eligible.length === 0
            ? "None of the selected runs allow this action."
            : `${eligible.length} of ${runs.length} selected ${runs.length === 1 ? "run" : "runs"} will be affected`}
        </span>
        {eligible.length > 0 && (
          <ChipRow items={eligible.map((run) => ({ key: run.id, label: runLabel(run) }))} variant="primary" label="Affected runs" />
        )}
        {skipped.length > 0 && (
          <div className="d-flex flex-column border rounded-3 bg-iron-50">
            <span className="font-size-xs fw-semibold text-iron-700 px-3 pt-2">
              Skipped ({skipped.length})
            </span>
            {skipped.map((run) => (
              <div key={run.id} className="d-flex flex-column px-3 py-1 font-size-xs" style={{ minWidth: 0 }}>
                <span className="text-iron-700 text-truncate" title={runLabel(run)}>{runLabel(run)}</span>
                <span className="text-iron-500">{run?.available_actions?.[action]?.reason ?? "Not allowed in its current status."}</span>
              </div>
            ))}
            <span className="pb-2" />
          </div>
        )}
        {children}
      </div>
    </ConfirmDialog>
  );
}

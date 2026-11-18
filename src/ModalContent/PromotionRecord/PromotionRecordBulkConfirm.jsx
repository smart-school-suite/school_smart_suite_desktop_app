import { useState } from "react";
import { textareaSchema } from "../../ComponentConfig/YupValidationSchema";
import ChipRow from "../../components/Card/ChipRow";
import { TextAreaInput } from "../../components/FormComponents/InputComponents";
import ConfirmDialog from "../../components/Modals/ConfirmDialog";
import { useFormError } from "../../hooks/form/useFormError";
import { useBulkPromotionDecision } from "../../hooks/promotionRecord/useBulkPromotionDecision";

/**
 * The selected records, whichever way the dialog was opened: the toast's
 * dropdown passes rowData.selectedRecords, its icon button (ModalButton)
 * passes bulkData.
 */
export const selectedPromotionRecords = (rowData, bulkData) =>
  rowData?.selectedRecords ?? (Array.isArray(bulkData) ? bulkData : bulkData?.selectedRecords) ?? [];

const studentLabel = (record) => record?.s_full_name || record?.s_username || "Student";

/** Splits records by whether the server says the action is allowed (record.available_actions). */
export const partitionRecords = (records, action) => ({
  eligible: records.filter((record) => record?.available_actions?.[action]?.allowed),
  skipped: records.filter((record) => !record?.available_actions?.[action]?.allowed),
});

/**
 * Confirmation for a bulk promotion decision: which selected students it
 * applies to, which are skipped and why, and one optional note saved on
 * each record. The server re-checks every record when it is sent.
 */
export default function PromotionRecordBulkConfirm({
  handleClose,
  rowData,
  bulkData,
  resetAll,
  action,
  title,
  icon,
  tone,
  description,
  confirmLabel,
  errorTitle,
}) {
  const records = selectedPromotionRecords(rowData, bulkData);
  const { mutate, isPending } = useBulkPromotionDecision(action, handleClose, resetAll);
  const { formError, errorBannerRef, handleServerError, clearFormError } = useFormError(errorTitle);
  const [note, setNote] = useState("");
  const [noteValid, setNoteValid] = useState(true);
  const { eligible, skipped } = partitionRecords(records, action);

  const handleConfirm = () => {
    clearFormError();
    mutate(
      { record_ids: eligible.map((record) => record.id), admin_note: note.trim() || null },
      { onError: handleServerError },
    );
  };

  return (
    <ConfirmDialog
      title={title}
      icon={icon}
      tone={tone}
      description={description}
      confirmLabel={eligible.length > 1 ? `${confirmLabel} ${eligible.length} Students` : confirmLabel}
      onConfirm={handleConfirm}
      onCancel={handleClose}
      isPending={isPending}
      confirmDisabled={eligible.length === 0 || noteValid === false}
      error={formError}
      errorRef={errorBannerRef}
      onDismissError={clearFormError}
    >
      <div className="d-flex flex-column gap-2">
        <span className="font-size-xs text-iron-500">
          {eligible.length === 0
            ? "None of the selected students allow this decision."
            : `${eligible.length} of ${records.length} selected ${records.length === 1 ? "student" : "students"} will be affected`}
        </span>
        {eligible.length > 0 && (
          <ChipRow
            items={eligible.map((record) => ({ key: record.id, label: studentLabel(record) }))}
            variant="primary"
            label="Affected students"
          />
        )}
        {skipped.length > 0 && (
          <div className="d-flex flex-column border rounded-3 bg-iron-50">
            <span className="font-size-xs fw-semibold text-iron-700 px-3 pt-2">
              Skipped ({skipped.length})
            </span>
            {skipped.map((record) => (
              <div key={record.id} className="d-flex flex-column px-3 py-1 font-size-xs" style={{ minWidth: 0 }}>
                <span className="text-iron-700 text-truncate" title={studentLabel(record)}>{studentLabel(record)}</span>
                <span className="text-iron-500">
                  {record?.available_actions?.[action]?.reason ?? "Not allowed for this record."}
                </span>
              </div>
            ))}
            <span className="pb-2" />
          </div>
        )}
        {eligible.length > 0 && (
          <div className="d-flex flex-column gap-1 font-size-sm">
            <span className="fw-medium">Note (Optional)</span>
            <TextAreaInput
              rows={3}
              value={note}
              onChange={(value) => setNote(value ?? "")}
              onValidationChange={(valid) => setNoteValid(valid)}
              placeholder="Saved on every affected record, e.g. why this decision was made"
              validationSchema={textareaSchema({ required: false })}
              optional
            />
          </div>
        )}
      </div>
    </ConfirmDialog>
  );
}

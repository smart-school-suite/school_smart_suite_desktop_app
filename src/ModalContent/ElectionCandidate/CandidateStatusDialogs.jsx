import { ShieldOff, Undo2 } from "lucide-react";
import { useState } from "react";
import { TextAreaInput } from "../../components/FormComponents/InputComponents";
import ConfirmDialog from "../../components/Modals/ConfirmDialog";
import { useBulkDisqualifyCandidates } from "../../hooks/electionCandidate/useBulkDisqualifyCandidates";
import { useBulkReinstateCandidates } from "../../hooks/electionCandidate/useBulkReinstateCandidates";
import { useDisqualifyCandidate } from "../../hooks/electionCandidate/useDisqualifyCandidate";
import { useReinstateCandidate } from "../../hooks/electionCandidate/useReinstateCandidate";
import { useFormError } from "../../hooks/form/useFormError";

const selectionOf = ({ rowData, bulkData }) =>
  Array.isArray(bulkData) && bulkData.length ? bulkData : rowData?.selectedCandidates ?? (rowData ? [rowData] : []);

function CandidateDialog({ action, rowData, bulkData, handleClose, resetAll }) {
  const items = selectionOf({ rowData, bulkData });
  const isBulk = items.length > 1;
  const disqualify = action === "disqualify";
  const [reason, setReason] = useState("");
  const reset = resetAll ?? rowData?.resetAll;
  const disqualifyOne = useDisqualifyCandidate(handleClose);
  const reinstateOne = useReinstateCandidate(handleClose);
  const disqualifyMany = useBulkDisqualifyCandidates(handleClose, reset);
  const reinstateMany = useBulkReinstateCandidates(handleClose, reset);
  const single = disqualify ? disqualifyOne : reinstateOne;
  const bulk = disqualify ? disqualifyMany : reinstateMany;
  const { formError, errorBannerRef, handleServerError, clearFormError } = useFormError(
    disqualify ? "Failed To Disqualify Candidate" : "Failed To Reinstate Candidate",
  );

  const confirm = () => {
    clearFormError();
    const options = { onError: handleServerError };
    if (isBulk) {
      bulk.mutate({ candidateIds: items.map((item) => ({ candidate_id: item.id })), reason: reason || null }, options);
    } else if (disqualify) {
      single.mutate({ candidateId: items[0]?.id, reason: reason || null }, options);
    } else {
      single.mutate(items[0]?.id, options);
    }
  };

  return (
    <ConfirmDialog
      icon={disqualify ? ShieldOff : Undo2}
      title={`${disqualify ? "Disqualify" : "Reinstate"} ${isBulk ? `${items.length} candidates` : "candidate"}`}
      description={
        disqualify
          ? "Disqualified candidates are removed from the ballot and cannot win. Votes they already received stay recorded."
          : "The candidate returns to the ballot and can receive votes again."
      }
      confirmLabel={disqualify ? "Disqualify" : "Reinstate"}
      tone={disqualify ? "danger" : "primary"}
      onConfirm={confirm}
      onCancel={handleClose}
      isPending={single.isPending || bulk.isPending}
      confirmDisabled={disqualify && !reason.trim()}
      error={formError}
      errorRef={errorBannerRef}
      onDismissError={clearFormError}
    >
      {!isBulk && items[0] && (
        <span className="fw-semibold">{[items[0].name, items[0].position?.name].filter(Boolean).join(" · ")}</span>
      )}
      {disqualify && (
        <div className="d-flex flex-column gap-1">
          <label className="font-size-sm fw-medium">Reason</label>
          <TextAreaInput value={reason} onChange={setReason} onValidationChange={() => {}} rows={3} placeholder="Why the candidate is disqualified" />
        </div>
      )}
    </ConfirmDialog>
  );
}

export const DisqualifyCandidateDialog = (props) => <CandidateDialog action="disqualify" {...props} />;
export const ReinstateCandidateDialog = (props) => <CandidateDialog action="reinstate" {...props} />;

import { CircleCheck, CircleX, Trash2 } from "lucide-react";
import { useState } from "react";
import { TextAreaInput } from "../../components/FormComponents/InputComponents";
import ConfirmDialog from "../../components/Modals/ConfirmDialog";
import { useApproveElectionApplication } from "../../hooks/electionApplication/useApproveApplication";
import { useBulkApproveApplications } from "../../hooks/electionApplication/useBulkApproveApplications";
import { useBulkRejectApplications } from "../../hooks/electionApplication/useBulkRejectApplications";
import { useDeleteApplications } from "../../hooks/electionApplication/useDeleteApplication";
import { useRejectElectionApplication } from "../../hooks/electionApplication/useRejectApplication";
import { useFormError } from "../../hooks/form/useFormError";

const applicantLabel = (application) =>
  [application?.applicant_name, application?.position?.name].filter(Boolean).join(" · ");

// Single or bulk selection: rowData is one application, bulkData an array.
const selectionOf = ({ rowData, bulkData }) =>
  Array.isArray(bulkData) && bulkData.length ? bulkData : rowData?.selectedApplications ?? (rowData ? [rowData] : []);

function Remarks({ value, onChange, placeholder }) {
  return (
    <div className="d-flex flex-column gap-1">
      <label className="font-size-sm fw-medium">Remarks</label>
      <TextAreaInput value={value} onChange={onChange} onValidationChange={() => {}} optional rows={3} placeholder={placeholder} />
    </div>
  );
}

function DecisionDialog({ decision, rowData, bulkData, handleClose, resetAll }) {
  const items = selectionOf({ rowData, bulkData });
  const isBulk = items.length > 1;
  const approve = decision === "approve";
  const [remarks, setRemarks] = useState("");
  const reset = resetAll ?? rowData?.resetAll;
  const approveOne = useApproveElectionApplication(handleClose);
  const rejectOne = useRejectElectionApplication(handleClose);
  const approveMany = useBulkApproveApplications(handleClose, reset);
  const rejectMany = useBulkRejectApplications(handleClose, reset);
  const single = approve ? approveOne : rejectOne;
  const bulk = approve ? approveMany : rejectMany;
  const { formError, errorBannerRef, handleServerError, clearFormError } = useFormError(
    approve ? "Failed To Approve Application" : "Failed To Reject Application",
  );
  const isPending = single.isPending || bulk.isPending;

  const confirm = () => {
    clearFormError();
    const options = { onError: handleServerError };
    if (isBulk) {
      bulk.mutate(
        {
          electionApplicationIds: items.map((item) => ({ election_application_id: item.id })),
          remarks: remarks || null,
        },
        options,
      );
    } else {
      single.mutate({ applicationId: items[0]?.id, remarks: remarks || null }, options);
    }
  };

  return (
    <ConfirmDialog
      icon={approve ? CircleCheck : CircleX}
      title={approve ? (isBulk ? `Approve ${items.length} applications` : "Approve application") : isBulk ? `Reject ${items.length} applications` : "Reject application"}
      description={
        approve
          ? "Approved applicants become candidates and appear on the ballot when voting opens. Term limits for the position are checked again."
          : "Rejected applicants are not placed on the ballot. Your remarks are shared with them, so be specific and kind."
      }
      confirmLabel={approve ? "Approve" : "Reject"}
      tone={approve ? "primary" : "danger"}
      onConfirm={confirm}
      onCancel={handleClose}
      isPending={isPending}
      error={formError}
      errorRef={errorBannerRef}
      onDismissError={clearFormError}
    >
      {!isBulk && items[0] && <span className="fw-semibold">{applicantLabel(items[0])}</span>}
      <Remarks
        value={remarks}
        onChange={setRemarks}
        placeholder={approve ? "Optional note for the candidate" : "Why the application was rejected"}
      />
    </ConfirmDialog>
  );
}

export const ApproveApplicationDialog = (props) => <DecisionDialog decision="approve" {...props} />;
export const RejectApplicationDialog = (props) => <DecisionDialog decision="reject" {...props} />;

export function DeleteApplicationDialog({ rowData, handleClose }) {
  const { mutate, isPending } = useDeleteApplications(handleClose);
  const { formError, errorBannerRef, handleServerError, clearFormError } = useFormError("Failed To Delete Application");
  return (
    <ConfirmDialog
      icon={Trash2}
      title="Delete application"
      description="The application is removed permanently. If it was approved, the candidacy is removed too. Applications whose candidate already received votes cannot be deleted."
      confirmLabel="Delete"
      tone="danger"
      onConfirm={() => {
        clearFormError();
        mutate(rowData?.id, { onError: handleServerError });
      }}
      onCancel={handleClose}
      isPending={isPending}
      error={formError}
      errorRef={errorBannerRef}
      onDismissError={clearFormError}
    >
      <span className="fw-semibold">{applicantLabel(rowData)}</span>
    </ConfirmDialog>
  );
}

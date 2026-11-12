import { UserX } from "lucide-react";
import { useState } from "react";
import { TextAreaInput } from "../../components/FormComponents/InputComponents";
import ConfirmDialog from "../../components/Modals/ConfirmDialog";
import { useTerminateOfficeHolder } from "../../hooks/electionOffice/useTerminateOfficeHolder";
import { useFormError } from "../../hooks/form/useFormError";

/** End a tenure early without a replacement. rowData: an office holder. */
export default function TerminateOfficeHolder({ rowData: holder, handleClose }) {
  const [remarks, setRemarks] = useState("");
  const { mutate, isPending } = useTerminateOfficeHolder(handleClose);
  const { formError, errorBannerRef, handleServerError, clearFormError } = useFormError("Failed To End Tenure");
  return (
    <ConfirmDialog
      icon={UserX}
      title="End tenure early"
      description={`${holder?.name ?? "This holder"} stops holding ${holder?.position?.name ?? "the position"} today. The tenure stays in the office history. To hand over the remaining years, use Replace instead.`}
      confirmLabel="End Tenure"
      tone="danger"
      confirmDisabled={!remarks.trim()}
      onConfirm={() => {
        clearFormError();
        mutate({ holderId: holder.id, data: { remarks } }, { onError: handleServerError });
      }}
      onCancel={handleClose}
      isPending={isPending}
      error={formError}
      errorRef={errorBannerRef}
      onDismissError={clearFormError}
    >
      <div className="d-flex flex-column gap-1">
        <label className="font-size-sm fw-medium">Reason</label>
        <TextAreaInput value={remarks} onChange={setRemarks} onValidationChange={() => {}} rows={3} placeholder="Why the tenure ends early" />
      </div>
    </ConfirmDialog>
  );
}

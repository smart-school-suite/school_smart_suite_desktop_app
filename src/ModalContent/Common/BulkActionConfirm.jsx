import { CircleX } from "lucide-react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import FormErrorBanner from "../../components/errors/FormErrorBanner";
import { useFormError } from "../../hooks/form/useFormError";

/**
 * Shared confirmation modal for bulk table actions (same layout as the
 * teacher bulk modals).
 *
 * - items:        the selected rows
 * - useAction:    a mutation hook, called as useAction(...actionArgs) or,
 *                 when actionArgs is omitted, useAction(handleClose, resetAll)
 * - buildPayload: (items) => request body sent to the mutation
 */
function BulkActionConfirm({
  handleClose,
  resetAll,
  items = [],
  useAction,
  actionArgs,
  buildPayload,
  title,
  heading = "Are you absolutely sure?",
  description,
  confirmLabel = "Yes, Continue",
  errorTitle = "Bulk Action Failed",
}) {
  const { mutate, isPending } = useAction(
    ...(actionArgs ?? [handleClose, resetAll]),
  );
  const { formError, errorBannerRef, handleServerError, clearFormError } =
    useFormError(errorTitle);

  const handleConfirm = () => {
    if (isPending || items.length === 0) return;
    clearFormError();
    mutate(buildPayload(items), {
      onError: handleServerError,
      onSuccess: () => {
        handleClose?.();
        resetAll?.();
      },
    });
  };

  return (
    <div className="w-100">
      <div
        className="border-bottom rounded-top-4 p-2 d-flex flex-column justify-content-center"
        style={{ height: "6dvh", background: "#f9f9f9" }}
      >
        <div className="d-flex flex-row align-items-center justify-content-between">
          <span className="font-size-sm fw-semibold">{title}</span>
          <button
            onClick={() => handleClose()}
            className="border-none border rounded-circle bg-transparent p-0"
            style={{
              width: "2rem",
              height: "2rem",
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
            }}
          >
            <CircleX size={16} />
          </button>
        </div>
      </div>
      <FormErrorBanner
        ref={errorBannerRef}
        error={formError}
        onDismiss={clearFormError}
        className="mb-2"
      />
      <div className="px-1 d-flex flex-column gap-2 font-size-sm pt-3">
        <span className="fw-semibold">{heading}</span>
        <p>{description}</p>
        <span className="text-iron-500 font-size-xs">
          {items.length} item{items.length === 1 ? "" : "s"} selected
        </span>
      </div>
      <div className="mt-auto border-top p-2" style={{ height: "8dvh" }}>
        <div className="d-flex flex-row align-items-center justify-content-end gap-2 w-100">
          <button
            className="border-none px-3 py-2 border rounded-3 font-size-sm w-50 bg-none"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white w-50"
            onClick={handleConfirm}
            disabled={isPending}
          >
            {isPending ? <SingleSpinner /> : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

/** Selected rows arrive as rowData.selected (dropdown) or bulkData (ModalButton). */
export const getSelected = (rowData, bulkData) =>
  rowData?.selected ?? (Array.isArray(bulkData) ? bulkData : []);

export default BulkActionConfirm;

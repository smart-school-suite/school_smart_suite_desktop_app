import { CircleX } from "lucide-react";
import FormErrorBanner from "../errors/FormErrorBanner";
import { SingleSpinner } from "../Spinners/Spinners";

/**
 * Dialog body for confirmations rendered inside ModalButton / CustomModal.
 *
 *   <ConfirmDialog
 *     title="Publish election"
 *     description="Participants will see the schedule."
 *     confirmLabel="Publish"
 *     onConfirm={handlePublish}
 *     onCancel={handleClose}
 *     isPending={isPending}
 *     error={formError} errorRef={errorBannerRef} onDismissError={clearFormError}
 *     tone="danger"                 // red confirm button
 *     confirmDisabled={!reason}
 *   >
 *     optional extra content (e.g. a remarks field)
 *   </ConfirmDialog>
 */
export default function ConfirmDialog({
  title,
  description,
  icon: HeaderIcon,
  children,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  isPending = false,
  confirmDisabled = false,
  tone = "primary",
  error,
  errorRef,
  onDismissError,
}) {
  const confirmClass = tone === "danger" ? "bg-red-500 text-white" : "primary-background text-white";
  return (
    <div className="w-100 d-flex flex-column">
      <div className="border-bottom rounded-top-4 px-3 py-2 d-flex flex-row align-items-center justify-content-between bg-iron-50">
        <div className="d-flex flex-row align-items-center gap-2">
          {HeaderIcon && <HeaderIcon size={16} className={tone === "danger" ? "text-red-500" : "text-primary-500"} />}
          <span className="font-size-sm fw-semibold">{title}</span>
        </div>
        <button
          type="button"
          onClick={() => onCancel?.()}
          className="border-none border rounded-circle bg-transparent p-0 d-grid"
          style={{ width: "2rem", height: "2rem", placeItems: "center" }}
          aria-label="Close"
        >
          <CircleX size={16} />
        </button>
      </div>
      <FormErrorBanner ref={errorRef} error={error} onDismiss={onDismissError} className="mx-3 mt-3 mb-0" />
      <div className="px-3 pt-3 pb-2 d-flex flex-column gap-3 font-size-sm">
        {description && <p className="m-0 text-iron-600" style={{ lineHeight: 1.6 }}>{description}</p>}
        {children}
      </div>
      <div className="border-top px-3 py-2 mt-2 d-flex flex-row align-items-center justify-content-end gap-2">
        <button type="button" className="border-none px-3 py-2 border rounded-3 font-size-sm w-50 bg-none" onClick={() => onCancel?.()}>
          {cancelLabel}
        </button>
        <button
          type="button"
          className={`border-none px-3 py-2 rounded-3 font-size-sm w-50 ${confirmClass}`}
          onClick={() => onConfirm?.()}
          disabled={isPending || confirmDisabled}
          style={{ opacity: confirmDisabled ? 0.6 : 1 }}
        >
          {isPending ? <SingleSpinner /> : confirmLabel}
        </button>
      </div>
    </div>
  );
}

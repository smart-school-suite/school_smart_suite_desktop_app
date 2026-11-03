import { useDeleteStudentResit } from "../../hooks/studentResit/useDeleteResit";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import FormErrorBanner from "../../components/errors/FormErrorBanner";
import { useFormError } from "../../hooks/form/useFormError";
function DeleteResitFee({ handleClose, rowData }) {
  const { id: feeId } = rowData;
  const { mutate: deleteStudentResit, isPending } =
    useDeleteStudentResit(handleClose);
  const { formError, errorBannerRef, handleServerError, clearFormError } =
    useFormError("Failed To Delete Resit Fee");
  const handleDeleteResitFee = () => {
    clearFormError();
    deleteStudentResit(feeId, { onError: handleServerError });
  };
  return (
    <>
      <div className="w-100">
        <h4 className="fw-semibold">
          Are you absolutely sure about deleting admins?
        </h4>
        <p className="my-3" style={{ fontSize: "0.85rem" }}>
          This action cannot be undone. This will permanently delete this
          account and remove this account bulkData from our servers.
        </p>
        <FormErrorBanner
          ref={errorBannerRef}
          error={formError}
          onDismiss={clearFormError}
          className="mb-2"
        />
        <div className="mt-2 w-100 d-flex justify-content-end gap-2">
          <button
            className="border-none px-3 py-2 text-primary rounded-3 font-size-sm w-50"
            onClick={() => {
              handleClose();
            }}
          >
            Cancel
          </button>
          <button
            className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white w-50"
            onClick={handleDeleteResitFee}
          >
            {isPending ? <SingleSpinner /> : "Yes, Delete All"}
          </button>
        </div>
      </div>
    </>
  );
}
export default DeleteResitFee;

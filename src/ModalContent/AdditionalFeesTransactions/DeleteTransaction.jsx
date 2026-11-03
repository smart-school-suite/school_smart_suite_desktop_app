import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useDeleteAdditionalFeeTransaction } from "../../hooks/additionalFee/useDeleteAdditionalFeeTransaction";
import FormErrorBanner from "../../components/errors/FormErrorBanner";
import { useFormError } from "../../hooks/form/useFormError";
function DeleteTransaction({ rowData, handleClose }) {
  const { id:transactionId } = rowData;
  const { mutate:deleteTransaction, isPending } = useDeleteAdditionalFeeTransaction(handleClose)
  const { formError, errorBannerRef, handleServerError, clearFormError } =
    useFormError("Failed To Delete Transaction");
  const handleDeleteTuitionFeeTransaction =  () => {
      clearFormError();
      deleteTransaction(transactionId, { onError: handleServerError });
  };
  return (
    <>
    <div className="w-100">
          <h4 className="fw-semibold">Are you absolutely sure?</h4>
          <p className="my-3" style={{ fontSize: "0.85rem" }}>
            This action cannot be undone. This will permanently delete this
            account and remove this account data from our servers.
          </p>
          <FormErrorBanner
            ref={errorBannerRef}
            error={formError}
            onDismiss={clearFormError}
            className="mb-2"
          />
          <div className="mt-4 d-flex justify-content-end gap-2">
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
              onClick={handleDeleteTuitionFeeTransaction}
              disabled={isPending}
            >
              { isPending ? <SingleSpinner /> : "Yes, Delete" }
            </button>
          </div>
        </div>
    </>
  );
}
export default DeleteTransaction;

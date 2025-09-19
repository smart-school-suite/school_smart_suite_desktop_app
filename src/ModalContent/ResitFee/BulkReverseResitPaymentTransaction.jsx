import { useBulkReverserResitTransactions } from "../../hooks/studentResit/useBulkReverseTransactions";
import { SingleSpinner } from "../../components/Spinners/Spinners";
function BulkReverseResitFeeTransaction({ handleClose, bulkData, resetAll }) {
  const formattedData = bulkData.map((items) => ({ transaction_id: items.id }));
  const { mutate: reverseTransaction, isPending } =
    useBulkReverserResitTransactions(handleClose, resetAll);
  const handleBulkReverseTransaction = () => {
    reverseTransaction({ transactionIds: formattedData });
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
            onClick={handleBulkReverseTransaction}
          >
            {isPending ? <SingleSpinner /> : "Yes, Reverse All"}
          </button>
        </div>
      </div>
    </>
  );
}
export default BulkReverseResitFeeTransaction;

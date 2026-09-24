import { useBulkReverseTuitionFeeTransactions } from "../../hooks/FeePayment/useBulkReverseTuitionFeeTransactions";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { CircleX } from "lucide-react";
function BulkReverseTuitionFeeTransaction({ bulkData, handleClose, resetAll }) {
  const formattedData = bulkData?.selectedTransactions?.map((items) => ({ transaction_id: items.id }));
  const { mutate: bulkReverseTransaction, isPending } =
    useBulkReverseTuitionFeeTransactions(handleClose, resetAll);
  const handleBulkReverseTransaction = () => {
    bulkReverseTransaction({ transactionIds: formattedData });
  };

  return (
    <>
      <div className="w-100">
        <div
          className="border-bottom rounded-top-4 p-2 d-flex flex-column justify-content-center"
          style={{ height: "6dvh", background: "#f9f9f9" }}
        >
          <div className="d-flex flex-row align-items-center justify-content-between">
            <div>
              <span className="font-size-sm fw-semibold">
                Reverse Transaction
              </span>
            </div>
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
        <div className="px-2 d-flex flex-column gap-2 font-size-sm pt-3">
          <span className="fw-semibold">Are you Absolutely sure ?</span>
          <p>
            This action cannot be undone. This will Permanently delete This
            account and remove this account data from our servers
          </p>
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
              onClick={() => {
                handleBulkReverseTransaction();
              }}
            >
              {isPending ? <SingleSpinner /> : <>Yes, Reverse</>}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default BulkReverseTuitionFeeTransaction;

import { useFetchResitFeeTransactionDetialsQuery } from "../../Slices/Asynslices/fetchSlice";
import { SingleSpinner } from "../../components/Spinners";
function TransactionDetails({ row_id: transactionId, handleClose }) {
  const {
    data: transactionDetails,
    isLoading,
    error,
  } = useFetchResitFeeTransactionDetialsQuery({
    transactionId: transactionId,
  });
  if (isLoading) {
    return <SingleSpinner />;
  }
  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between mb-3 px-2">
        <h5 className="fw-semibold">Transation Details</h5>
        <button
          className="border-none text-white primary-background"
          onClick={() => {
            handleClose();
          }}
          style={{
            width: "2rem",
            height: "2rem",
            borderRadius: "2rem",
            fontSize: "0.75rem",
          }}
        >
          <span>IC</span>
        </button>
      </div>
      <div className="d-flex flex-row align-items-center gap-4">
        <div className="w-100 border-bottom">
          <div className="d-block">
            <p className="my-0">{transactionDetails.data.amount}</p>
            <span className="font-size-sm gainsboro-color">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam,
              iure facilis. Officiis placea
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
export default TransactionDetails;

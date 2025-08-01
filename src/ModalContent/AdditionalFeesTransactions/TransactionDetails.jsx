import { SingleSpinner } from "../../components/Spinners/Spinners";
import { Icon } from "@iconify/react";
import { useGetAdditionalFeeTransactionDetails } from "../../hooks/additionalFee/useGetAdditionalFeeTransactionDetails";
import { formatNumber } from "../../utils/functions";
function TransactionDetails({ rowData, handleClose }) {
  const { id: transactionId } = rowData;
  const { data: transactionDetails, isLoading } =
    useGetAdditionalFeeTransactionDetails(transactionId);
  if (isLoading) {
    return <SingleSpinner />;
  }
  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between mb-3">
        <span className="m-0">Transaction Details</span>
        <span
          className="m-0"
          onClick={() => {
            handleClose();
          }}
        >
          <Icon icon="charm:cross" width="22" height="22" />
        </span>
      </div>
      <div className="modal-content-container">
        <div className="d-flex flex-column">
          <div className="my-2 d-flex flex-row align-items-center justify-content-between">
            <span className="font-size-sm gainsboro-color">TransactionID</span>
            <span className="fw-semibold font-size-sm">
              #{transactionDetails?.data?.transaction_id}
            </span>
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <div className="py-2 d-flex flex-column">
              <span className="my-0 font-size-sm gainsboro-color">Amount</span>
              <span className="my-0 font-size-sm">
                {formatNumber(transactionDetails?.data?.amount)}
              </span>
            </div>
          </div>
          <hr />
        </div>
      </div>
    </>
  );
}
export default TransactionDetails;

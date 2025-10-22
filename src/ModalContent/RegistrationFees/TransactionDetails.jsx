import { useGetRegistrationFeeTransactionDetails } from "../../hooks/feePayment/useGetRegistrationFeeTransactionDetails";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
import { formatISODate } from "../../utils/functions";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../components/errors/Error";
function TransactionDetails({ handleClose, rowData }) {
  const currencyState = useSelector((state) => state.auth.user);
  const userCurrencySymbol =
    currencyState?.schoolDetails?.school?.country?.currency || "";
  const { id: transactionId } = rowData;
  const {
    data: transactionDetails,
    isLoading,
    error,
  } = useGetRegistrationFeeTransactionDetails(transactionId);
  return (
    <>
      <div className="d-flex flex-row align-items-center">
        <div className="w-100">
          <div className="d-flex flex-row align-items-center justify-content-between mb-3 w-100">
            <span className="m-0">Registration Transaction Fee Details</span>
            <span
              className="m-0"
              onClick={() => {
                handleClose();
              }}
            >
              <Icon icon="charm:cross" width="22" height="22" />
            </span>
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="d-flex flex-column gap-2 modal-content-container">
          <div className="d-flex flex-column gap-4">
            {[...Array(10)].map((_, index) => (
              <div className="d-flex gap-1 flex-column" key={index}>
                <RectangleSkeleton height="1dvh" width="40%" />
                <RectangleSkeleton height="1dvh" width="15%" />
              </div>
            ))}
          </div>
        </div>
      ) : error ? (
        <NotFoundError
          title={error?.response?.data?.errors?.title}
          description={error?.response?.data?.errors?.description}
        ></NotFoundError>
      ) : (
        <div className="modal-content-container">
          <div className="d-flex flex-row align-items-center justify-content-end">
            <div className="d-flex flex-row align-items-center font-size-sm fw-semibold gap-1">
              <span>#</span>
              <span>{transactionDetails?.data?.transaction_id}</span>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-between my-1 w-100">
            <div className="py-2">
              <p className="my-0 font-size-sm">Amount</p>
              <p className="my-0 gainsboro-color font-size-sm">
                {parseFloat(transactionDetails?.data?.amount).toFixed(2)}{" "}
                {userCurrencySymbol}
              </p>
            </div>
          </div>
          <hr />
          <div className="d-flex align-items-center justify-content-between my-1 w-100">
            <div className="py-2">
              <p className="my-0 font-size-sm">Payment Method</p>
              <p className="my-0 gainsboro-color font-size-sm">
                {transactionDetails?.data?.payment_method}
              </p>
            </div>
          </div>
          <hr />
          <div className="d-flex align-items-center justify-content-between my-1 w-100">
            <div className="py-2">
              <p className="my-0 font-size-sm">Student Name</p>
              <p className="my-0 gainsboro-color font-size-sm">
                {transactionDetails?.data?.registration_fee?.student?.name}
              </p>
            </div>
          </div>
          <hr />
          <div className="d-flex align-items-center justify-content-between my-1 w-100">
            <div className="py-2">
              <p className="my-0 font-size-sm">Specialty</p>
              <p className="my-0 gainsboro-color font-size-sm">
                {
                  transactionDetails?.data?.registration_fee?.specialty
                    ?.specialty_name
                }
              </p>
            </div>
          </div>
          <hr />
          <div className="d-flex align-items-center justify-content-between my-1 w-100">
            <div className="py-2">
              <p className="my-0 font-size-sm">Level</p>
              <p className="my-0 gainsboro-color font-size-sm">
                {transactionDetails?.data?.registration_fee?.level?.name}
              </p>
            </div>
          </div>
          <hr />
          <div className="d-flex align-items-center justify-content-between my-1 w-100">
            <div className="py-2">
              <p className="my-0 font-size-sm">Create At</p>
              <p className="my-0 gainsboro-color font-size-sm">
                {formatISODate(transactionDetails?.data?.created_at)}
              </p>
            </div>
          </div>
          <hr />
          <div className="d-flex align-items-center justify-content-between my-1 w-100">
            <div className="py-2">
              <p className="my-0 font-size-sm">Updated At</p>
              <p className="my-0 gainsboro-color font-size-sm">
                {formatISODate(transactionDetails?.data?.updated_at)}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default TransactionDetails;

import { useGetTuitionFeeDetails } from "../../hooks/feePayment/useGetTuitionFeeDetails";
import { Icon } from "@iconify/react";
import { formatNumber,  formatISODate  } from "../../utils/functions";
import { useSelector } from "react-redux";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../components/errors/Error";
function TuitionFeeDetails({ rowData, handleClose }) {
  const { id: tuitionFeeId } = rowData;
  const {
    data: tuitionFeeDetails,
    isLoading,
    error,
  } = useGetTuitionFeeDetails(tuitionFeeId);
  const currencyState = useSelector((state) => state.auth.user);
  const userCurrencySymbol =
    currencyState?.schoolDetails?.school?.country?.currency || "";
  return (
    <>
      <div className="d-flex flex-row align-items-center">
        <div className="w-100">
          <div className="d-flex flex-row align-items-center justify-content-between mb-3 w-100">
            <span className="m-0">Tuition Fee Details</span>
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
          <div className="d-flex align-items-center justify-content-between my-1 w-100">
            <div className="py-2">
              <p className="my-0 font-size-sm">Tuition Fee Total</p>
              <p className="my-0 gainsboro-color font-size-sm">
                {formatNumber(
                  parseFloat(tuitionFeeDetails?.data?.tution_fee_total).toFixed(
                    2
                  )
                )}{" "}
                {userCurrencySymbol}
              </p>
            </div>
          </div>
          <hr />
          <div className="d-flex align-items-center justify-content-between my-1 w-100">
            <div className="py-2">
              <p className="my-0 font-size-sm">Amount Paid</p>
              <p className="my-0 gainsboro-color font-size-sm">
                {formatNumber(
                  parseFloat(tuitionFeeDetails?.data?.amount_paid).toFixed(2)
                )}{" "}
                {userCurrencySymbol}
              </p>
            </div>
          </div>
          <hr />
          <div className="d-flex align-items-center justify-content-between my-1 w-100">
            <div className="py-2">
              <p className="my-0 font-size-sm">Amount Left</p>
              <p className="my-0 gainsboro-color font-size-sm">
                {formatNumber(
                  parseFloat(tuitionFeeDetails?.data?.amount_left).toFixed(2)
                )}{" "}
                {userCurrencySymbol}
              </p>
            </div>
          </div>
          <hr />
          <div className="d-flex align-items-center justify-content-between my-1 w-100">
            <div className="py-2">
              <p className="my-0 font-size-sm">Status</p>
              <p className="my-0 gainsboro-color font-size-sm">
                {tuitionFeeDetails?.data?.status}
              </p>
            </div>
          </div>
          <hr />
          <div className="d-flex align-items-center justify-content-between my-1 w-100">
            <div className="py-2">
              <p className="my-0 font-size-sm">Student Name</p>
              <p className="my-0 gainsboro-color font-size-sm">
                {tuitionFeeDetails?.data?.student?.name}
              </p>
            </div>
          </div>
          <hr />
          <div className="d-flex align-items-center justify-content-between my-1 w-100">
            <div className="py-2">
              <p className="my-0 font-size-sm">Specialty</p>
              <p className="my-0 gainsboro-color font-size-sm">
                {tuitionFeeDetails?.data?.specialty?.specialty_name}
              </p>
            </div>
          </div>
          <hr />
          <div className="d-flex align-items-center justify-content-between my-1 w-100">
            <div className="py-2">
              <p className="my-0 font-size-sm">Level</p>
              <p className="my-0 gainsboro-color font-size-sm">
                {tuitionFeeDetails?.data?.level?.name}
              </p>
            </div>
          </div>
           <div className="d-flex align-items-center justify-content-between my-1 w-100">
            <div className="py-2">
              <p className="my-0 font-size-sm">Create At</p>
              <p className="my-0 gainsboro-color font-size-sm">
                {formatISODate(tuitionFeeDetails?.data?.created_at)}
              </p>
            </div>
          </div>
          <hr />
          <div className="d-flex align-items-center justify-content-between my-1 w-100">
            <div className="py-2">
              <p className="my-0 font-size-sm">Updated At</p>
              <p className="my-0 gainsboro-color font-size-sm">
                {formatISODate(tuitionFeeDetails?.data?.updated_at)}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default TuitionFeeDetails;

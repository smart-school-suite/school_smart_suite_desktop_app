import { useGetTuitionFeeDetails } from "../../hooks/feePayment/useGetTuitionFeeDetails";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { Icon } from "@iconify/react";
import { formatNumber } from "../../utils/functions";
import { useSelector } from "react-redux";
function TuitionFeeDetails({ rowData, handleClose }) {
  const currencyState = useSelector((state) => state.auth.user);
  const userCurrencySymbol =
    currencyState?.schoolDetails?.school?.country?.currency || "";
  const { id: feeId } = rowData;
  const { data: tuitionFeeDetails, isFetching } =
    useGetTuitionFeeDetails(feeId);
  if (isFetching) {
    return <SingleSpinner />;
  }
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
      <div className="d-flex align-items-center justify-content-between my-1 w-100">
        <div className="py-2">
          <p className="my-0 font-size-sm">Tuition Fee Total</p>
          <p className="my-0 gainsboro-color font-size-sm">
            {formatNumber(
              parseFloat(tuitionFeeDetails?.data?.tution_fee_total).toFixed(2)
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
    </>
  );
}
export default TuitionFeeDetails;

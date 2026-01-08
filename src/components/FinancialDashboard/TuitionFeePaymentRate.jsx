import { useSelector } from "react-redux";
import GuageChart from "../ChartComponents/GuageChart";
import { useGetTuitionFeePaymentRate } from "../../hooks/financialAnalytics/useGetTuitionFeePaymentRate";
import RectangleSkeleton from "../SkeletonPageLoader/RectangularSkeleton";
import { formatNumber } from "../../utils/functions";
function TuitionFeePaymentRate() {
  const {
    data: paymentRate,
    isLoading,
    error,
  } = useGetTuitionFeePaymentRate(2025);
  const schoolData = useSelector((state) => state.auth.user);
  const currency = schoolData.schoolDetails.school.country.currency;
  const darkMode = useSelector((state) => state.theme.darkMode);
  return (
    <>
      {isLoading ? (
        <RectangleSkeleton width="50%" height="45dvh" />
      ) : error ? (
        <h1>Payment Rate Error</h1>
      ) : (
        <div
          style={{ width: "50%", height: "50dvh" }}
          className={`${
            darkMode ? "dark-bg" : "bg-white"
          } gainsboro-color  rounded-4 p-2`}
        >
          <div className="text-start mb-1">
            <span className="fw-semibold font-size-sm">
              Tuition Fee Payment Rate
            </span>
          </div>
          <div className="w-100 h-75">
            <GuageChart value={paymentRate.data.payment_rate - 100} colors={["#f57779", "#ffe60d", "#58d073"]} />
          </div>
          <div className="d-flex flex-column w-100 gap-1">
            <div className="d-flex flex-row align-items-center justify-content-between">
              <span className="font-size-sm">Tuition Fee Payment Progress</span>
              <span className="font-size-sm">{(paymentRate.data.payment_rate - 100).toFixed(2)} %</span>
            </div>
            <div className="tuition-fee-progress-container">
              <div
                className="tuition-fee-progress"
                style={{ width: `${paymentRate.data.payment_rate - 100}%` }}
              ></div>
            </div>
            <div>
              <span className="font-size-sm">{formatNumber(paymentRate.data.unpaid_tuition_fee)} {currency} / {formatNumber(paymentRate.data.paid_tuition_fee)}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default TuitionFeePaymentRate;

import { useGetSchoolRevenue } from "../../hooks/financialAnalytics/useGetSchoolRevenue";
import RectangleSkeleton from "../SkeletonPageLoader/RectangularSkeleton";
import NumberFlow from "@number-flow/react";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
function Revenue() {
  const { data: revenue, isLoading, error } = useGetSchoolRevenue(2025);
  const schoolData = useSelector((state) => state.auth.user);
  const currency = schoolData.schoolDetails.school.country.currency;
  return (
    <>
      {isLoading ? (
        <div className="w-100 d-flex flex-row align-items-end justify-content-between">
          <div className="d-flex flex-column gap-2 w-50">
            <RectangleSkeleton width="20%" height="2dvh" speed={1} />
            <RectangleSkeleton width="65%" height="4dvh" speed={1} />
          </div>
          <div className="w-50 d-flex flex-row justify-content-end">
            <RectangleSkeleton width="50%" height="4dvh" speed={1} />
          </div>
        </div>
      ) : error ? (
        <h1>Revenue</h1>
      ) : (
        <div className="d-flex flex-row justify-content-between align-items-center">
          <div className="d-flex flex-row align-items-center gap-2">
            <div className="d-flex flex-column">
              <span className="font-size-sm m-0">Revenue</span>
              <FormattedCurrency
                value={revenue?.data?.revenue || 0}
                currency={currency}
              />
            </div>
            {/* <div className="d-flex flex-row gap-2">
                        <button
                          className="d-flex flex-row border-none align-items-center rounded-pill primary-background-400 primary-color-dark fw-medium px-2 my-0 font-size-sm py-1"
                          style={{
                            background: "#c8eac8",
                            color: "#2c692d",
                          }}
                        >
                          <Icon
                            icon="material-symbols:keyboard-double-arrow-up"
                            className="rotate-45 fs-6"
                          />
                          <span>{<NumberFlow value={(data.data.revenue_progress.revenue_increase_stat.percentage).toFixed(1)}/>} %</span>
                        </button>
                        <button
                          className="d-flex flex-row border-none align-items-center rounded-pill gap-1 primary-color-dark fw-medium my-0 font-size-sm"
                          style={{
                            background: "#c8eac8",
                            color: "#2c692d",
                          }}
                        >
                          <Icon icon="ic:round-plus" />
                          <span><NumberFlow value={data.data.revenue_progress.revenue_increase_stat.value}/> {currency}</span>
                        </button>
                      </div>*/}
          </div>
          <div className="d-flex flex-row gap-2 align-items-end gainsboro-color">
            <button className="border-none rounded-pill p-2 d-flex flex-row gap-5 align-items-center font-size-sm">
              <div className="d-flex flex-row gap-2 align-items-center font-size-sm">
                <Icon icon="solar:calendar-outline" />
                <span>2026</span>
              </div>
              <Icon icon="majesticons:chevron-down-line" />
            </button>
            <button className="rounded-circle p-1 border-none">
              <Icon icon="mynaui:download" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
export default Revenue;

const FormattedCurrency = ({ value, currency, className = "" }) => {
  const parsedValue = parseFloat(value);

  const formattedValue = !isNaN(parsedValue) ? parsedValue.toFixed(2) : "0.00";

  const [integerPart, decimalPart] = formattedValue.split(".");
  const darkMode = useSelector((state) => state.theme.darkMode);
  return (
    <span
      className={`m-0 ${
        darkMode ? "light-skyblue-color" : "primary-color-dark"
      } ${className}`}
      style={{ fontSize:"2rem", fontWeight:500 }}
    >
      <span className="me-2">{currency}</span>
      <span
        className={`${darkMode ? "light-skyblue-color" : "primary-color-dark"}`}
      >
        <NumberFlow value={integerPart} />
      </span>
      <span className="light-skyblue-color">
        .{<NumberFlow value={decimalPart} />}
      </span>
    </span>
  );
};

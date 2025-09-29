import { useGetFeeScheduleSlots } from "../../hooks/feeSchedule/useGetFeeScheduleSlots";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { Icon } from "@iconify/react";
import { NotFoundError } from "../../components/errors/Error";
import { formatDate, formatNumber } from "../../utils/functions";
import { useSelector } from "react-redux";
function FeeScheduleSlots({ handleClose, rowData }) {
  const { id: feeScheduleId } = rowData;
    const currencyState = useSelector((state) => state.auth.user);
    const userCurrencySymbol =
      currencyState?.schoolDetails?.school?.country?.currency || "";
  const {
    data: schedule,
    isLoading,
    error,
  } = useGetFeeScheduleSlots(feeScheduleId);
  return (
    <>
      <div className="d-flex flex-row align-items-center">
        <div className="d-flex flex-row align-items-center justify-content-between mb-3 w-100">
          <span className="m-0">Fee Schedule</span>
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
      {isLoading ? (
        <div className="d-flex flex-column gap-2">
          <RectangleSkeleton width="100%" height="15dvh" speed={1} />
          <RectangleSkeleton width="100%" height="15dvh" speed={1} />
        </div>
      ) : error ? (
        <NotFoundError
          title={error.response.data.errors.title}
          description={error.response.data.errors.description}
        />
      ) : (
        <>
          {schedule?.data?.map((items) => (
            <>
              <div className="d-flex flex-column gap-1 font-size-sm">
                <span className="fw-semibold font-size-sm">
                  {items?.installment?.name}
                </span>
                <div className="d-flex flex-column gap-2">
                  <div className="d-flex gap-2 flex-row align-items-center font-size-sm">
                    <span><Icon icon="solar:calendar-linear"  /></span>
                    <span>{formatDate(items.due_date)}</span>
                  </div>
                  <div className="box-path ms-2 px-2 w-100">
                    <div className="d-flex flex-row align-items-center justify-content-between w-100">
                      <span className="fw-medium">{formatNumber(parseFloat(items.amount))} {userCurrencySymbol}</span>
                      <span>Pending</span>
                    </div>
                  </div>
                  <div className="d-flex gap-2 flex-row align-items-center font-size-sm">
                    <span><Icon icon="solar:calendar-linear"  /></span>
                    <span>{formatDate(items.due_date)}</span>
                  </div>
                </div>
              </div>
              <hr />
            </>
          ))}
        </>
      )}
    </>
  );
}
export default FeeScheduleSlots;

import { X } from "lucide-react";
import { useSelector } from "react-redux";
import EmptyState from "../../components/errors/EmptyState";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { FeeScheduleSummary } from "../../DrawerContent/FeeSchedule/FeeScheduleEditor";
import { useGetFeeScheduleSlots } from "../../hooks/feeSchedule/useGetFeeScheduleSlots";
import {
  formatScheduleDate,
  totalPercentage,
} from "../../utils/feeSchedule/scheduleRules";
import { formatNumber } from "../../utils/functions";

/** Read-only view of a payment schedule: each installment's due date, share and amount. */
function FeeScheduleSlots({ handleClose, rowData: schedule }) {
  const currency =
    useSelector(
      (state) => state.auth.user?.schoolDetails?.school?.country?.currency,
    ) || "";
  const { data, isLoading, error } = useGetFeeScheduleSlots(schedule?.id);
  const slots = Array.isArray(data?.data) ? data.data : [];
  const total = totalPercentage(
    slots.map((slot) => ({ fee_percentage: slot.fee_percentage })),
  );

  return (
    <div className="w-100 font-size-sm">
      <div className="border-bottom rounded-top-4 p-2 bg-iron-50 d-flex flex-row align-items-center justify-content-between">
        <span className="fw-semibold">Payment Schedule</span>
        <button
          type="button"
          className="bg-white border rounded-circle"
          onClick={handleClose}
          aria-label="Close"
          style={{
            width: "2rem",
            height: "2rem",
            display: "grid",
            placeItems: "center",
          }}
        >
          <X size={16} />
        </button>
      </div>

      <div className="d-flex flex-column gap-3 p-3">
        <FeeScheduleSummary
          schedule={schedule}
          installmentCount={isLoading || error ? null : slots.length}
        />

        {isLoading ? (
          <div className="d-flex flex-column gap-2">
            {[0, 1, 2].map((key) => (
              <RectangleSkeleton key={key} height="3.25rem" />
            ))}
          </div>
        ) : error ? (
          <EmptyState
            mascot="error"
            height="14rem"
            mascotHeight="6rem"
            title={
              error?.response?.data?.errors?.title ??
              "This schedule could not be loaded"
            }
            description={
              error?.response?.data?.errors?.description ??
              "Check your connection and try again."
            }
          />
        ) : slots.length === 0 ? (
          <EmptyState
            mascot="sad"
            height="14rem"
            mascotHeight="6rem"
            title="No installments yet"
            description="This academic year has no payment schedule. Use “Configure Schedule” to set its installments."
          />
        ) : (
          <div className="d-flex flex-column border rounded-3 font-size-sm">
            {slots.map((slot, index) => (
              <div
                key={slot.id}
                className={`d-flex flex-row align-items-center gap-2 px-3 py-2 ${index > 0 ? "border-top" : ""}`}
              >
                <span
                  className="bg-primary-50 text-primary-600 rounded-circle fw-semibold font-size-xs flex-shrink-0"
                  style={{
                    width: "1.5rem",
                    height: "1.5rem",
                    display: "grid",
                    placeItems: "center",
                  }}
                  aria-hidden="true"
                >
                  {slot.installment?.count ?? index + 1}
                </span>
                <div
                  className="d-flex flex-column flex-grow-1"
                  style={{ minWidth: 0 }}
                >
                  <span className="fw-semibold text-truncate">
                    {slot.installment?.name ?? "Installment"}
                  </span>
                  <span className="font-size-xs text-iron-400">
                    Due {formatScheduleDate(slot.due_date)}
                  </span>
                </div>
                <div className="d-flex flex-column align-items-end">
                  <span className="fw-semibold text-nowrap">
                    {formatNumber(Number(slot.amount) || 0, 2)} {currency}
                  </span>
                  <span className="font-size-xs text-iron-400">
                    {formatNumber(Number(slot.fee_percentage) || 0, 2)}%
                  </span>
                </div>
              </div>
            ))}
            <div className="d-flex flex-row align-items-center justify-content-between px-3 py-2 border-top bg-iron-50 rounded-bottom-3">
              <span className="text-iron-500">Total</span>
              <span className="fw-semibold">
                {formatNumber(
                  Number(schedule?.tuition_fee) * (total / 100) || 0,
                  2,
                )}{" "}
                {currency} · {formatNumber(total, 2)}%
              </span>
            </div>
          </div>
        )}
        <span className="font-size-xs text-iron-400">
          Amounts shown are for this specialty&apos;s tuition. Each student pays
          the same shares of their own tuition fee.
        </span>
      </div>
    </div>
  );
}
export default FeeScheduleSlots;

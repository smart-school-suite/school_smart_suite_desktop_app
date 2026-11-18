import { useSelector } from "react-redux";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import StatusPill from "../../components/Election/StatusPill";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../components/errors/Error";
import { useGetResitDetails } from "../../hooks/studentResit/useGetResitDetails";
import { formatDate, formatNumber } from "../../utils/functions";

const PAYMENT = {
  paid: { label: "Paid", tone: "success" },
  unpaid: { label: "Unpaid", tone: "warning" },
};

const when = (value, fallback = "-") => (value ? formatDate(value) : fallback);

function detailRows(resit, currency) {
  const money = (value) => `${formatNumber(parseFloat(value ?? 0))} ${currency}`.trim();
  const payment = PAYMENT[resit.payment_status] ?? { label: resit.payment_status ?? "-", tone: "neutral" };
  const level = [resit.level_name, resit.level_number && `(${resit.level_number})`].filter(Boolean).join(" ");
  const score =
    resit.resit_score == null
      ? "Not evaluated yet"
      : [resit.resit_score, resit.resit_grade && `· ${resit.resit_grade}`, resit.resit_grade_status && `· ${resit.resit_grade_status}`]
          .filter(Boolean)
          .join(" ");

  return [
    { label: "Student Name", value: resit.student_name ?? "-" },
    { label: "Username", value: resit.student_username ? `@${resit.student_username}` : "-" },
    { label: "Course Title", value: resit.course_title ?? "-" },
    { label: "Course Code", value: resit.course_code ?? "-" },
    { label: "Course Credit", value: resit.course_credit ?? "-" },
    { label: "Exam Name", value: resit.exam_name ?? "-" },
    { label: "Semester", value: resit.semester ?? "-" },
    { label: "Academic Year", value: resit.academic_year ?? "-" },
    { label: "Specialty Name", value: resit.specialty_name ?? "-" },
    { label: "Level", value: level || "-" },
    { label: "Carry Over", value: resit.is_carry_over ? "Yes" : "No" },
    { label: "Attempts", value: resit.attempts ?? 0 },
    { label: "Resit Fee", value: money(resit.resit_fee) },
    { label: "Amount Paid", value: money(resit.amount_paid) },
    { label: "Balance", value: money(resit.balance) },
    { label: "Payment Status", value: <StatusPill tone={payment.tone}>{payment.label}</StatusPill> },
    {
      label: "Payments",
      value: resit.transactions
        ? `${resit.transactions} ${resit.transactions === 1 ? "payment" : "payments"} · last on ${when(resit.last_paid_at)}`
        : "No payments yet",
    },
    { label: "Resit Score", value: score },
    { label: "Updated At", value: when(resit.updated_at) },
    { label: "Created At", value: when(resit.created_at) },
  ];
}

/** A student's resit, laid out like the specialty details drawer. */
function ResitDetails({ drawerData, handleClose }) {
  const user = useSelector((state) => state.auth.user);
  const currency = user?.schoolDetails?.school?.country?.currency ?? "";
  const { data, isLoading, error } = useGetResitDetails(drawerData?.id);
  const resit = data?.data;

  return (
    <div className="font-size-sm d-flex flex-column gap-4 pt-2" style={{ flex: 1, minHeight: 0 }}>
      {isLoading ? (
        <div className="d-flex flex-column gap-4 ps-2">
          {[...Array(8)].map((_, index) => (
            <div className="d-flex gap-1 flex-column" key={index}>
              <RectangleSkeleton height="1dvh" width="15%" />
              <RectangleSkeleton height="1dvh" width="100%" />
            </div>
          ))}
        </div>
      ) : error ? (
        <NotFoundError
          title={error?.response?.data?.errors?.title}
          description={error?.response?.data?.errors?.description}
        />
      ) : (
        resit && (
          <>
            <div className="drawer-content px-2">
              {detailRows(resit, currency).map((row, index) => (
                <div key={row.label}>
                  {index > 0 && <hr />}
                  <div className="d-flex align-items-center justify-content-between my-1 w-100">
                    <div className="py-2 d-flex flex-column align-items-start gap-1">
                      <span className="text-iron-500">{row.label}</span>
                      <span>{row.value}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="drawer-footer font-size-sm">
              <div className="d-flex flex-column w-100">
                <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.5} />
                <div className="d-flex flex-row align-items-center justify-content-between py-3 px-2">
                  <button type="button" className="border-none bg-none" onClick={() => handleClose?.()}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
}
export default ResitDetails;

import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import PromotionRunStatusRenderer from "../../components/Renderer/Promotion/PromotionRunStatusRenderer";
import { NotFoundError } from "../../components/errors/Error";
import { useGetPromotionRunDetails } from "../../hooks/promotionRun/useGetPromotionRunDetails";
import { formatDate, formatNumber } from "../../utils/functions";

const count = (value) => formatNumber(Number(value ?? 0));
const dateOr = (value, fallback) => (value ? formatDate(value) : fallback);
const day = (value) =>
  value
    ? new Date(value).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" })
    : "-";

/** The rows shown for a run; each is a label and its value. */
function detailRows(run) {
  return [
    { label: "Specialty Name", value: run.specialty ?? "-" },
    { label: "Department Name", value: run.department ?? "-" },
    { label: "Level Name", value: run.level_name ?? "-" },
    { label: "Level Number", value: run.level ?? "-" },
    { label: "Academic Year", value: run.academic_year ?? "-" },
    { label: "Academic Year Dates", value: `${day(run.ac_start_date)} - ${day(run.ac_end_date)}` },
    { label: "Status", value: <PromotionRunStatusRenderer value={run.status} /> },
    { label: "Students Evaluated", value: `${count(run.processed_students)} of ${count(run.total_students)}` },
    { label: "Promoted", value: count(run.promoted_count) },
    { label: "Retained", value: count(run.repeated_count) },
    { label: "Graduated", value: count(run.graduated_count) },
    { label: "Needs Review", value: count(run.review_count) },
    { label: "Excluded", value: count(run.excluded_count) },
    { label: "Failed", value: count(run.failed_count) },
    { label: "Initiated By", value: run.initiated_by ?? "Not triggered yet" },
    { label: run.status === "scheduled" ? "Scheduled For" : "Started At", value: dateOr(run.started_at, "Not started") },
    { label: "Completed At", value: dateOr(run.completed_at, "Not completed") },
    { label: "Updated At", value: formatDate(run.updated_at) },
    { label: "Created At", value: formatDate(run.created_at) },
  ];
}

function PromotionDetails({ drawerData, handleClose }) {
  const { data, isLoading, error } = useGetPromotionRunDetails(drawerData?.id);
  const run = data?.data;

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
        run && (
          <>
            <div className="drawer-content px-2">
              {detailRows(run).map((row, index) => (
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
export default PromotionDetails;

import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import StatusPill from "../../components/Election/StatusPill";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../components/errors/Error";
import { RESIT_PUBLICATION_STATUS } from "../../components/Renderer/ResitResult/ResitResultPublicationStatusRenderer";
import { useGetResitResultPublishDetails } from "../../hooks/resitResult/useGetResitResultPublishDetails";
import { formatDate } from "../../utils/functions";

const when = (value, fallback = "-") => (value ? formatDate(value) : fallback);

function detailRows(details) {
  const status = RESIT_PUBLICATION_STATUS[details.publication_status] ?? RESIT_PUBLICATION_STATUS.default;
  const published = ["published", "scheduled"].includes(details.publication_status);
  return [
    { label: "Resit Exam", value: details.exam_name ?? "-" },
    { label: "Specialty Name", value: details.specialty_name ?? "-" },
    { label: "Level Name", value: details.level_name ?? "-" },
    { label: "Academic Year", value: details.school_year ?? "-" },
    { label: "Publication Status", value: <StatusPill tone={status.tone}>{status.label}</StatusPill> },
    {
      label: details.publication_status === "scheduled" ? "Will Be Published On" : "Published On",
      value: when(details.published_at, "Not published yet"),
    },
    { label: "Published By", value: published ? details.published_by ?? "-" : "Not published yet" },
    { label: "Candidates", value: details.total_candidates ?? 0 },
    { label: "Evaluated Candidates", value: details.evaluated_candidates ?? 0 },
    { label: "Candidates Not Evaluated", value: details.not_evaluated_candidates ?? 0 },
  ];
}

/** Whether, when and by whom a resit exam's results were published; laid out like the specialty details. */
function ResitPublicationDetails({ drawerData, handleClose }) {
  const { data, isLoading, error } = useGetResitResultPublishDetails(drawerData?.id);
  const details = data?.data;

  return (
    <div className="font-size-sm d-flex flex-column gap-4 pt-2" style={{ flex: 1, minHeight: 0 }}>
      {isLoading ? (
        <div className="d-flex flex-column gap-4 ps-2">
          {[...Array(6)].map((_, index) => (
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
        details && (
          <>
            <div className="drawer-content px-2">
              {detailRows(details).map((row, index) => (
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
export default ResitPublicationDetails;

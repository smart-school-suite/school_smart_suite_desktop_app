import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import StatusPill from "../../components/Election/StatusPill";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../components/errors/Error";
import RichTextContent from "../../components/TextComponents/RichTextContent";
import { useGetGraduationBatchDetails } from "../../hooks/graduationBatch/useGetGraduationBatchDetails";
import { formatDate, formatNumber } from "../../utils/functions";

const CEREMONY = {
  upcoming: { label: "Upcoming", tone: "primary" },
  in_progress: { label: "In progress", tone: "success" },
  held: { label: "Held", tone: "neutral" },
  not_scheduled: { label: "Not scheduled", tone: "warning" },
};

const count = (value) => formatNumber(Number(value ?? 0));
const when = (value, fallback = "-") => (value ? formatDate(value) : fallback);

/** "2 eligible · 1 pending review · 1 ineligible", skipping zeros. */
const breakdown = (counts, labels) =>
  Object.entries(labels)
    .filter(([key]) => (counts?.[key] ?? 0) > 0)
    .map(([key, label]) => `${count(counts[key])} ${label}`)
    .join(" · ") || "None yet";

function detailRows(batch) {
  const ceremony = CEREMONY[batch.ceremony_status] ?? CEREMONY.not_scheduled;
  const year = batch.academic_year;
  return [
    { label: "Batch Name", value: batch.name ?? "-" },
    { label: "Description", value: batch.description ? <RichTextContent content={batch.description} /> : "No description" },
    { label: "Academic Year", value: year ? `${year.name}${year.year_start ? ` (${year.year_start} – ${year.year_end})` : ""}` : "-" },
    { label: "Ceremony", value: <StatusPill tone={ceremony.tone}>{ceremony.label}</StatusPill> },
    { label: "Location", value: batch.location || "Not set" },
    { label: "Graduation Starts", value: when(batch.graduation_start_date, "Not scheduled") },
    { label: "Graduation Ends", value: when(batch.graduation_end_date, "Not scheduled") },
    { label: "Graduates", value: count(batch.total_graduates) },
    {
      label: "Graduation Status",
      value: breakdown(batch.status_counts, { alumni: "alumni", continuing: "continuing", pending: "pending" }),
    },
    {
      label: "Eligibility",
      value: breakdown(batch.eligibility_counts, { eligible: "eligible", pending_review: "pending review", ineligible: "ineligible" }),
    },
    {
      label: "Clearance",
      value: breakdown(batch.clearance_counts, { cleared: "cleared", pending: "pending", blocked: "blocked" }),
    },
    { label: "Updated At", value: when(batch.updated_at) },
    { label: "Created At", value: when(batch.created_at) },
  ];
}

function Row({ label, value, first }) {
  return (
    <div>
      {!first && <hr />}
      <div className="d-flex align-items-center justify-content-between my-1 w-100">
        <div className="py-2 d-flex flex-column align-items-start gap-1">
          <span className="text-iron-500">{label}</span>
          {/* A div, not a span: the description renders block HTML (paragraphs, lists). */}
          <div>{value}</div>
        </div>
      </div>
    </div>
  );
}

/** A graduation batch, laid out like the other details drawers. */
function GraduationBatchDetails({ drawerData, handleClose }) {
  const { data, isLoading, error } = useGetGraduationBatchDetails(drawerData?.id);
  const batch = data?.data;

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
          title={error?.response?.data?.errors?.title ?? "Graduation Batch Not Found"}
          description={error?.response?.data?.errors?.description ?? "Unable to load graduation batch details. Please try again."}
        />
      ) : (
        batch && (
          <>
            <div className="drawer-content px-2">
              {detailRows(batch).map((row, index) => (
                <Row key={row.label} label={row.label} value={row.value} first={index === 0} />
              ))}
              {batch.specialties?.length > 0 && (
                <>
                  <hr />
                  <div className="py-2 d-flex flex-column gap-2">
                    <span className="text-iron-500">Graduates By Specialty</span>
                    {batch.specialties.map((specialty) => (
                      <div key={specialty.specialty_id} className="d-flex flex-row align-items-center justify-content-between gap-2">
                        <span className="text-truncate">
                          {specialty.specialty_name ?? "Unknown specialty"}
                          {specialty.level_name && <span className="text-iron-400"> · {specialty.level_name}</span>}
                        </span>
                        <span className="fw-semibold flex-shrink-0">{count(specialty.graduates)}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
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
export default GraduationBatchDetails;

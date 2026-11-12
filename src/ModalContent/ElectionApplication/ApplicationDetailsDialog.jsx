import { CircleX } from "lucide-react";
import ParticipantIdentity from "../../components/Election/ParticipantIdentity";
import StatusPill from "../../components/Election/StatusPill";
import { APPLICATION_STATUS, formatElectionDateTime } from "../../utils/election/electionDisplay";

function Block({ label, children }) {
  return (
    <div className="d-flex flex-column gap-1">
      <span className="text-iron-500 font-size-xs fw-semibold text-uppercase" style={{ letterSpacing: "0.04em" }}>{label}</span>
      <p className="m-0 font-size-sm" style={{ whiteSpace: "pre-line", lineHeight: 1.65 }}>{children || "—"}</p>
    </div>
  );
}

/** Full application (manifesto, vision, commitment). rowData: an application. */
export default function ApplicationDetailsDialog({ rowData: application, handleClose }) {
  return (
    <div className="w-100 d-flex flex-column">
      <div className="border-bottom rounded-top-4 px-3 py-2 d-flex flex-row align-items-center justify-content-between bg-iron-50">
        <span className="font-size-sm fw-semibold">Application · {application?.position?.name}</span>
        <button
          type="button"
          onClick={() => handleClose?.()}
          className="border-none border rounded-circle bg-transparent p-0 d-grid"
          style={{ width: "2rem", height: "2rem", placeItems: "center" }}
          aria-label="Close"
        >
          <CircleX size={16} />
        </button>
      </div>
      <div className="p-3 d-flex flex-column gap-3">
        <ParticipantIdentity
          person={application?.applicant}
          name={application?.applicant_name}
          type={application?.applicant_type}
          trailing={<StatusPill meta={APPLICATION_STATUS[application?.application_status]} />}
        />
        <Block label="Manifesto">{application?.manifesto}</Block>
        <Block label="Personal vision">{application?.personal_vision}</Block>
        <Block label="Commitment statement">{application?.commitment_statement}</Block>
        {application?.review_remarks && <Block label="Review remarks">{application.review_remarks}</Block>}
        <span className="text-iron-400 font-size-xs">
          Submitted {formatElectionDateTime(application?.created_at)}
          {application?.reviewed_at ? ` · Reviewed ${formatElectionDateTime(application.reviewed_at)}` : ""}
        </span>
      </div>
    </div>
  );
}

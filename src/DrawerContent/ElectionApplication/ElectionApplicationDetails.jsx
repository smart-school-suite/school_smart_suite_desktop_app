import ParticipantIdentity from "../../components/Election/ParticipantIdentity";
import StatusPill from "../../components/Election/StatusPill";
import { APPLICATION_STATUS, formatElectionDateTime } from "../../utils/election/electionDisplay";

function Block({ label, children }) {
  return (
    <div className="d-flex flex-column gap-1 py-2 border-bottom">
      <span className="text-iron-500 font-size-xs">{label}</span>
      <span className="font-size-sm" style={{ whiteSpace: "pre-line", lineHeight: 1.6 }}>{children || "—"}</span>
    </div>
  );
}

/** Application details from the table row (drawerData: an application). */
function ElectionApplicationDetails({ drawerData: application }) {
  return (
    <div className="drawer-content px-2 pt-2 pb-4 d-flex flex-column gap-2">
      <ParticipantIdentity
        person={application?.applicant}
        name={application?.applicant_name}
        type={application?.applicant_type}
        trailing={<StatusPill meta={APPLICATION_STATUS[application?.application_status]} />}
      />
      <div className="d-flex flex-column">
        <Block label="Election">{application?.election_title}</Block>
        <Block label="Position">{application?.position?.name}</Block>
        <Block label="Manifesto">{application?.manifesto}</Block>
        <Block label="Personal vision">{application?.personal_vision}</Block>
        <Block label="Commitment statement">{application?.commitment_statement}</Block>
        {application?.review_remarks && <Block label="Review remarks">{application.review_remarks}</Block>}
        <Block label="Submitted">{formatElectionDateTime(application?.created_at)}</Block>
        {application?.reviewed_at && <Block label="Reviewed">{formatElectionDateTime(application.reviewed_at)}</Block>}
      </div>
    </div>
  );
}

export default ElectionApplicationDetails;

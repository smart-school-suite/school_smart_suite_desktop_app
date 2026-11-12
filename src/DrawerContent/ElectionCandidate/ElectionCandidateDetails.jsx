import ParticipantIdentity from "../../components/Election/ParticipantIdentity";
import StatusPill from "../../components/Election/StatusPill";
import { useGetElectionCandidateDetails } from "../../hooks/electionCandidate/useGetElectionCandidateDetails";
import { CANDIDATE_STATUS } from "../../utils/election/electionDisplay";

function Block({ label, children }) {
  return (
    <div className="d-flex flex-column gap-1 py-2 border-bottom">
      <span className="text-iron-500 font-size-xs">{label}</span>
      <span className="font-size-sm" style={{ whiteSpace: "pre-line", lineHeight: 1.6 }}>{children ?? "—"}</span>
    </div>
  );
}

/** Candidate details (drawerData: a candidate row); vote count once results are published. */
function ElectionCandidateDetails({ drawerData }) {
  const { data } = useGetElectionCandidateDetails(drawerData?.id);
  const candidate = { ...drawerData, ...(data?.data ?? {}) };
  return (
    <div className="drawer-content px-2 pt-2 pb-4 d-flex flex-column gap-2">
      <ParticipantIdentity
        person={candidate?.candidate}
        name={candidate?.name}
        type={candidate?.candidate_type}
        trailing={<StatusPill meta={CANDIDATE_STATUS[candidate?.status]} />}
      />
      <div className="d-flex flex-column">
        <Block label="Election">{candidate?.election?.title}</Block>
        <Block label="Position">{candidate?.position?.name}</Block>
        {candidate?.status_reason && <Block label="Status reason">{candidate.status_reason}</Block>}
        {candidate?.vote_count !== null && candidate?.vote_count !== undefined && <Block label="Votes received">{candidate.vote_count}</Block>}
        <Block label="Manifesto">{candidate?.manifesto}</Block>
        <Block label="Personal vision">{candidate?.personal_vision}</Block>
        <Block label="Commitment statement">{candidate?.commitment_statement}</Block>
      </div>
    </div>
  );
}

export default ElectionCandidateDetails;

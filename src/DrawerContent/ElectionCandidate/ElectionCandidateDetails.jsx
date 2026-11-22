import { Badge, BADGE_CONTEXT } from "@/components/Renderer/badges";
import ParticipantIdentity from "../../components/Election/ParticipantIdentity";
import { useGetElectionCandidateDetails } from "../../hooks/electionCandidate/useGetElectionCandidateDetails";

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
        trailing={<Badge status={candidate?.status} context={BADGE_CONTEXT.ELECTION_CANDIDATE} />}
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

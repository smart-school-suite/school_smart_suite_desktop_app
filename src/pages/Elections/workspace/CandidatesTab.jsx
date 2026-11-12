import { ShieldOff, Undo2 } from "lucide-react";
import { useMemo } from "react";
import { ModalButton } from "../../../components/DataTableComponents/ActionComponent";
import ParticipantIdentity from "../../../components/Election/ParticipantIdentity";
import SectionCard from "../../../components/Election/SectionCard";
import StatusPill from "../../../components/Election/StatusPill";
import EmptyState from "../../../components/errors/EmptyState";
import RectangleSkeleton from "../../../components/SkeletonPageLoader/RectangularSkeleton";
import { useGetElectionCandidates } from "../../../hooks/electionCandidate/useGetElectionCandidates";
import {
  DisqualifyCandidateDialog,
  ReinstateCandidateDialog,
} from "../../../ModalContent/ElectionCandidate/CandidateStatusDialogs";
import { CANDIDATE_STATUS, serverErrorCopy } from "../../../utils/election/electionDisplay";

const CLOSED = ["completed", "cancelled"];

function CandidateCard({ candidate, editable }) {
  return (
    <div className="teacher-card">
      <ParticipantIdentity
        person={candidate.candidate}
        name={candidate.name}
        type={candidate.candidate_type}
        trailing={<StatusPill meta={CANDIDATE_STATUS[candidate.status]} />}
      />
      <p
        className="m-0 text-iron-600 course-card__description"
        style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
        title={candidate.manifesto}
      >
        {candidate.manifesto}
      </p>
      {candidate.status_reason && (
        <span className="font-size-xs text-red-600 text-truncate" title={candidate.status_reason}>
          {candidate.status_reason}
        </span>
      )}
      {editable && candidate.status !== "withdrawn" && (
        <div className="teacher-card__footer">
          <div className="teacher-card__divider" />
          {candidate.status === "active" ? (
            <ModalButton action={{ modalContent: DisqualifyCandidateDialog }} rowData={candidate}>
              <button type="button" className="teacher-card__details-btn d-flex flex-row align-items-center justify-content-center gap-1 text-red-500">
                <ShieldOff size={13} /> Disqualify
              </button>
            </ModalButton>
          ) : (
            <ModalButton action={{ modalContent: ReinstateCandidateDialog }} rowData={candidate}>
              <button type="button" className="teacher-card__details-btn d-flex flex-row align-items-center justify-content-center gap-1">
                <Undo2 size={13} /> Reinstate
              </button>
            </ModalButton>
          )}
        </div>
      )}
    </div>
  );
}

export default function CandidatesTab({ election, positions = [] }) {
  const { data, isLoading, error } = useGetElectionCandidates({ election_id: election?.id });
  const candidates = useMemo(() => (Array.isArray(data?.data) ? data.data : []), [data]);
  const editable = !CLOSED.includes(election?.status);

  const groups = useMemo(() => {
    const byPosition = new Map(positions.map((position) => [position.id, { position, candidates: [] }]));
    candidates.forEach((candidate) => {
      const id = candidate.position?.id;
      if (!byPosition.has(id)) byPosition.set(id, { position: candidate.position, candidates: [] });
      byPosition.get(id).candidates.push(candidate);
    });
    return [...byPosition.values()];
  }, [positions, candidates]);

  if (isLoading) {
    return (
      <div className="teacher-card-grid">
        {[...Array(6)].map((_, index) => <RectangleSkeleton key={index} height="11rem" />)}
      </div>
    );
  }
  if (error) {
    return <EmptyState mascot="error" height="20rem" mascotHeight="7rem" {...serverErrorCopy(error, "Unable to load candidates", "Something went wrong while loading the candidates.")} />;
  }
  if (candidates.length === 0) {
    return (
      <EmptyState
        mascot="sad"
        height="20rem"
        mascotHeight="7rem"
        title="No candidates yet"
        description="Applicants become candidates once you approve their application. Review pending applications in the Applications tab."
      />
    );
  }

  return (
    <div className="d-flex flex-column gap-3">
      {groups.map(({ position, candidates: list }) => (
        <SectionCard
          key={position?.id}
          title={position?.name ?? "Position"}
          description={`${position?.seats ?? 1} seat${(position?.seats ?? 1) > 1 ? "s" : ""} · ${list.filter((c) => c.status === "active").length} standing`}
        >
          {list.length === 0 ? (
            <span className="text-iron-500 font-size-sm">Nobody is standing for this position yet.</span>
          ) : (
            <div className="teacher-card-grid">
              {list.map((candidate) => (
                <CandidateCard key={candidate.id} candidate={candidate} editable={editable} />
              ))}
            </div>
          )}
        </SectionCard>
      ))}
    </div>
  );
}

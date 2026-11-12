import { Crown, Radio, Scale } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ModalButton } from "../../../components/DataTableComponents/ActionComponent";
import SectionCard from "../../../components/Election/SectionCard";
import StatusPill from "../../../components/Election/StatusPill";
import VoteShareBar from "../../../components/Election/VoteShareBar";
import EmptyState, { EmptyStateButton } from "../../../components/errors/EmptyState";
import RectangleSkeleton from "../../../components/SkeletonPageLoader/RectangularSkeleton";
import { useGetElectionResults } from "../../../hooks/election/useGetElectionResults";
import PublishElectionResults from "../../../ModalContent/Elections/PublishElectionResults";
import { formatElectionDateTime, relativeTo, serverErrorCopy } from "../../../utils/election/electionDisplay";

const STARTED = ["voting_open", "voting_closed", "completed"];
const LIVE_REFRESH_MS = 5000;

export default function ResultsTab({ election }) {
  const navigate = useNavigate();
  const started = STARTED.includes(election?.status);
  const live = election?.status === "voting_open";
  const { data, isLoading, error, dataUpdatedAt } = useGetElectionResults(election?.id, {
    enabled: Boolean(election?.id) && started,
    refetchInterval: live ? LIVE_REFRESH_MS : false,
  });
  const results = data?.data?.results ?? [];
  const turnout = data?.data?.turnout;
  const ties = results.filter((position) => position.requires_tie_resolution).length;

  if (!started) {
    return (
      <EmptyState
        mascot="empty"
        height="22rem"
        mascotHeight="7rem"
        title="Results appear when voting opens"
        description={
          election?.status === "cancelled"
            ? "This election was cancelled before voting started."
            : `Follow the count live from ${formatElectionDateTime(election?.voting_start)}. Every ballot is counted from the individual voting records.`
        }
      />
    );
  }
  if (isLoading) {
    return (
      <div className="d-flex flex-column gap-3">
        {[...Array(2)].map((_, index) => <RectangleSkeleton key={index} height="14rem" />)}
      </div>
    );
  }
  if (error) {
    return <EmptyState mascot="error" height="20rem" mascotHeight="7rem" {...serverErrorCopy(error, "Unable to load results", "Something went wrong while counting the votes.")} />;
  }
  if (results.length === 0) {
    return (
      <EmptyState
        mascot="sad"
        height="20rem"
        mascotHeight="7rem"
        title="No candidates on the ballot"
        description="There were no approved candidates for this election, so there is nothing to count."
      />
    );
  }

  return (
    <div className="d-flex flex-column gap-3">
      <div className="d-flex flex-row align-items-center justify-content-between gap-3 bg-white border rounded-4 px-3 py-2">
        <div className="d-flex flex-row align-items-center gap-3 font-size-sm">
          {live ? (
            <StatusPill tone="success" pulse>
              Live · updates every {LIVE_REFRESH_MS / 1000}s
            </StatusPill>
          ) : election?.is_results_published ? (
            <StatusPill tone="primary"><Crown size={11} /> Final results</StatusPill>
          ) : (
            <StatusPill tone="warning">Provisional · not published</StatusPill>
          )}
          <span className="text-iron-500 font-size-xs">
            {turnout?.voters_participated ?? 0} of {turnout?.eligible_voters ?? 0} voters ({turnout?.turnout_percentage ?? 0}% turnout)
          </span>
          {live && dataUpdatedAt > 0 && (
            <span className="text-iron-400 font-size-xs d-flex flex-row align-items-center gap-1">
              <Radio size={12} /> updated {relativeTo(new Date(dataUpdatedAt))}
            </span>
          )}
        </div>
        {election?.status === "voting_closed" && (
          <ModalButton action={{ modalContent: PublishElectionResults }} rowData={{ election, results }} size="md">
            <button type="button" className="border-none rounded-3 primary-background text-white font-size-sm px-3 py-2 d-flex flex-row align-items-center gap-1">
              <Crown size={14} /> Publish results
            </button>
          </ModalButton>
        )}
        {election?.status === "completed" && (
          <button type="button" className="border rounded-3 bg-white font-size-sm px-3 py-2" onClick={() => navigate("/election-office-holders")}>
            View office holders
          </button>
        )}
      </div>

      {ties > 0 && election?.status !== "completed" && (
        <div className="d-flex flex-row align-items-center gap-2 bg-old-lace-50 text-old-lace-800 rounded-3 px-3 py-2 font-size-sm">
          <Scale size={15} />
          <span>
            {ties} position{ties > 1 ? "s are" : " is"} tied for the last seat. You will choose the winner when publishing the results.
          </span>
        </div>
      )}

      <div className="d-grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(22rem, 1fr))" }}>
        {results.map((position) => {
          const leaderVotes = Math.max(0, ...position.candidates.map((c) => c.vote_count));
          return (
            <SectionCard
              key={position.position_id}
              title={position.position_name}
              description={`${position.seats} seat${position.seats > 1 ? "s" : ""} · ${position.total_votes} vote${position.total_votes === 1 ? "" : "s"} from ${position.total_voters} voter${position.total_voters === 1 ? "" : "s"}`}
              bodyClassName="pt-2"
            >
              <div className="d-flex flex-column gap-1">
                {position.candidates.map((candidate, index) => (
                  <VoteShareBar
                    key={candidate.candidate_id}
                    candidate={candidate}
                    rank={index + 1}
                    leader={leaderVotes > 0 && candidate.vote_count === leaderVotes}
                  />
                ))}
              </div>
            </SectionCard>
          );
        })}
      </div>

      {election?.status === "voting_open" && (
        <EmptyState
          mascot="empty"
          height="auto"
          mascotHeight="5rem"
          title="Voting is still open"
          description={`These numbers are provisional. Voting closes ${relativeTo(election?.voting_end) ?? "soon"}; you can also close it early from the actions above.`}
        />
      )}
      {election?.status === "completed" && results.length > 0 && (
        <div className="d-flex justify-content-center">
          <EmptyStateButton variant="secondary" onClick={() => navigate("/election-history")}>
            See election history
          </EmptyStateButton>
        </div>
      )}
    </div>
  );
}

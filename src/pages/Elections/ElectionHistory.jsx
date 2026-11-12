import { ChevronRight, Crown, Vote } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ParticipantIdentity from "../../components/Election/ParticipantIdentity";
import SectionCard from "../../components/Election/SectionCard";
import EmptyState, { EmptyStateButton } from "../../components/errors/EmptyState";
import SearchInput from "../../components/input/search";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { useDebounce } from "../../hooks/common/useDebounce";
import { useGetElectionHistory } from "../../hooks/election/useGetElectionHistory";
import { formatElectionDate, matchesQuery, serverErrorCopy } from "../../utils/election/electionDisplay";

const MASCOT_HEIGHT = "7rem";

/**
 * Completed elections and the people they elected. Winners come from the
 * office holder records, so replacements later in a tenure do not rewrite history.
 */
export default function ElectionHistory() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 250);
  const { data, isLoading, error } = useGetElectionHistory();
  const history = useMemo(() => (Array.isArray(data?.data) ? data.data : []), [data]);

  const visible = useMemo(
    () =>
      history.filter((item) =>
        matchesQuery(
          [
            item.election?.title,
            item.election_type?.election_title,
            item.system_academic_year?.name,
            ...item.winners.flatMap((winner) => [winner.name, winner.position?.name]),
          ],
          debouncedSearch,
        ),
      ),
    [history, debouncedSearch],
  );

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="d-flex flex-column gap-3">
          {[...Array(3)].map((_, index) => <RectangleSkeleton key={index} height="10rem" />)}
        </div>
      );
    }
    if (error) {
      return <EmptyState mascot="error" height="100%" mascotHeight={MASCOT_HEIGHT} {...serverErrorCopy(error, "Unable to load election history", "Something went wrong while loading past elections.")} />;
    }
    if (history.length === 0) {
      return (
        <EmptyState
          mascot="sad"
          height="100%"
          mascotHeight={MASCOT_HEIGHT}
          title="No completed elections yet"
          description="Once an election's results are published it appears here with its winners, turnout and candidates."
          actions={<EmptyStateButton icon={Vote} onClick={() => navigate("/elections")}>Go to Elections</EmptyStateButton>}
        />
      );
    }
    if (visible.length === 0) {
      return (
        <EmptyState
          mascot="notFound"
          height="100%"
          mascotHeight={MASCOT_HEIGHT}
          title="No matching elections"
          description={`No past election or winner matches "${debouncedSearch}".`}
          actions={<EmptyStateButton variant="secondary" onClick={() => setSearch("")}>Clear search</EmptyStateButton>}
        />
      );
    }
    return (
      <ol className="list-unstyled m-0 p-0 d-flex flex-column gap-3">
        {visible.map((item) => (
          <li key={item.election?.id}>
            <SectionCard
              title={item.election?.title ?? item.election_type?.election_title}
              description={`${item.election_type?.election_title ?? ""} · ${item.system_academic_year?.name ?? ""} · results published ${formatElectionDate(item.election?.results_published_at)} · ${item.candidates_count} candidates · ${item.votes_count} ballots`}
              actions={
                <button
                  type="button"
                  className="border rounded-3 bg-white font-size-xs px-2 py-1 d-flex flex-row align-items-center gap-1"
                  onClick={() => navigate(`/elections/${item.election?.id}?tab=results`)}
                >
                  Full results <ChevronRight size={13} />
                </button>
              }
            >
              {item.winners.length === 0 ? (
                <span className="text-iron-500 font-size-sm">No winners were recorded for this election.</span>
              ) : (
                <div className="d-grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(15rem, 1fr))" }}>
                  {item.winners.map((winner) => (
                    <div key={winner.office_holder_id} className="d-flex flex-column gap-1 border rounded-3 p-2">
                      <span className="d-flex flex-row align-items-center gap-1 text-primary-600 font-size-xs fw-semibold">
                        <Crown size={12} /> {winner.position?.name}
                      </span>
                      <ParticipantIdentity
                        name={winner.name}
                        type={winner.holder_type}
                        subtitle={`${winner.vote_count ?? 0} vote${winner.vote_count === 1 ? "" : "s"}`}
                        size="2rem"
                      />
                    </div>
                  ))}
                </div>
              )}
            </SectionCard>
          </li>
        ))}
      </ol>
    );
  };

  return (
    <div className="d-flex flex-column gap-2 h-100" style={{ minHeight: 0 }}>
      <div className="d-flex flex-row align-items-center justify-content-between gap-2 flex-shrink-0">
        <span className="font-size-xs text-iron-500">
          {history.length > 0 && (debouncedSearch ? `${visible.length} of ${history.length} elections` : `${history.length} completed election${history.length === 1 ? "" : "s"}`)}
        </span>
        <div style={{ width: "40%" }}>
          <SearchInput placeholder="Search elections, winners or positions" value={search} onChange={(value) => setSearch(value ?? "")} disabled={history.length === 0} />
        </div>
      </div>
      <div className="flex-grow-1 scroll-bar-sm over-flow-y-auto over-flow-x-hidden pe-1 pb-2" style={{ minHeight: 0 }}>
        {renderContent()}
      </div>
    </div>
  );
}

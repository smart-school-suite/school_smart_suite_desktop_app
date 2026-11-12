import { Plus, Settings2 } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import DrawerTrigger from "../../components/drawer/DrawerTrigger";
import ElectionCard from "../../components/Election/ElectionCard";
import EmptyState, { EmptyStateButton } from "../../components/errors/EmptyState";
import SearchInput from "../../components/input/search";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import CreateElection from "../../DrawerContent/Election/CreateElection";
import { useDebounce } from "../../hooks/common/useDebounce";
import { useGetElections } from "../../hooks/election/useGetElections";
import { useGetElectionTypes } from "../../hooks/electionType/useGetElectionTypes";
import {
  electionStatusMeta,
  matchesQuery,
  serverErrorCopy,
  STATUS_FILTERS,
} from "../../utils/election/electionDisplay";

const MASCOT_HEIGHT = "7rem";

function CreateElectionTrigger({ children }) {
  return (
    <DrawerTrigger title="Create Election" placement="right" drawerChildren={CreateElection}>
      {children}
    </DrawerTrigger>
  );
}

function Elections() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const debouncedSearch = useDebounce(search, 250);
  const { data, isLoading, error } = useGetElections();
  const elections = useMemo(() => (Array.isArray(data?.data) ? data.data : []), [data]);
  // Only needed to explain an empty page: no types means nothing can be created yet.
  const { data: types } = useGetElectionTypes({ enabled: !isLoading && elections.length === 0 });
  const hasTypes = (types?.data?.length ?? 0) > 0;

  const counts = useMemo(
    () =>
      Object.fromEntries(
        STATUS_FILTERS.map((item) => [
          item.key,
          item.statuses ? elections.filter((e) => item.statuses.includes(e.status)).length : elections.length,
        ]),
      ),
    [elections],
  );

  const visible = useMemo(() => {
    const statuses = STATUS_FILTERS.find((item) => item.key === filter)?.statuses;
    return elections.filter(
      (election) =>
        (!statuses || statuses.includes(election.status)) &&
        matchesQuery(
          [
            election.title,
            election.election_type?.election_title,
            election.system_academic_year?.name,
            electionStatusMeta(election.status).label,
          ],
          debouncedSearch,
        ),
    );
  }, [elections, filter, debouncedSearch]);

  const openElection = (election) => navigate(`/elections/${election.id}`);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="teacher-card-grid">
          {[...Array(6)].map((_, index) => (
            <RectangleSkeleton key={index} height="13rem" />
          ))}
        </div>
      );
    }
    if (error) {
      const copy = serverErrorCopy(error, "Unable to load elections", "Something went wrong while loading your school's elections.");
      return <EmptyState mascot="error" height="100%" mascotHeight={MASCOT_HEIGHT} {...copy} />;
    }
    if (elections.length === 0) {
      return hasTypes ? (
        <EmptyState
          mascot="sad"
          height="100%"
          mascotHeight={MASCOT_HEIGHT}
          title="No elections yet"
          description="Create your first election: pick an election type, set the application and voting dates, then choose who can vote and who can apply."
          actions={
            <CreateElectionTrigger>
              <EmptyStateButton icon={Plus}>Create Election</EmptyStateButton>
            </CreateElectionTrigger>
          }
        />
      ) : (
        <EmptyState
          mascot="sad"
          height="100%"
          mascotHeight={MASCOT_HEIGHT}
          title="Set up an election type first"
          description="Elections are based on an election type such as Student Union Government, with the positions people can stand for."
          hint="Create a type, add its positions, then come back to create the election."
          actions={
            <EmptyStateButton icon={Settings2} onClick={() => navigate("/election-type")}>
              Go to Election Types
            </EmptyStateButton>
          }
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
          description={
            debouncedSearch
              ? `No election matches "${debouncedSearch}" in this view. Try a title, type or academic year.`
              : "There are no elections with this status yet."
          }
          actions={
            <EmptyStateButton
              variant="secondary"
              onClick={() => {
                setSearch("");
                setFilter("all");
              }}
            >
              Show all elections
            </EmptyStateButton>
          }
        />
      );
    }
    return (
      <div className="teacher-card-grid">
        {visible.map((election) => (
          <ElectionCard key={election.id} election={election} onOpen={openElection} />
        ))}
      </div>
    );
  };

  return (
    <div className="d-flex flex-column gap-2 h-100" style={{ minHeight: 0 }}>
      <div className="d-flex flex-row align-items-center justify-content-between gap-2 flex-shrink-0">
        <div className="d-flex flex-row align-items-center gap-1 bg-white border rounded-3 p-1" role="tablist" aria-label="Filter elections">
          {STATUS_FILTERS.map((item) => {
            const active = item.key === filter;
            return (
              <button
                key={item.key}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(item.key)}
                className={`border-none rounded-2 font-size-xs px-2 py-1 d-flex flex-row align-items-center gap-1 ${
                  active ? "bg-primary-50 text-primary-600 fw-semibold" : "bg-transparent text-iron-500"
                }`}
              >
                <span>{item.label}</span>
                <span className={active ? "text-primary-500" : "text-iron-400"}>{counts[item.key] ?? 0}</span>
              </button>
            );
          })}
        </div>
        <div className="d-flex flex-row align-items-center gap-2" style={{ width: "40%" }}>
          {!isLoading && elections.length > 0 && (
            <span className="font-size-xs text-iron-500 text-nowrap">
              {visible.length === elections.length ? `${elections.length} elections` : `${visible.length} of ${elections.length}`}
            </span>
          )}
          <SearchInput
            placeholder="Search by title, type or academic year"
            value={search}
            onChange={(value) => setSearch(value ?? "")}
            disabled={elections.length === 0}
          />
        </div>
      </div>
      <div className="flex-grow-1 scroll-bar-sm over-flow-y-auto over-flow-x-hidden pe-1 pb-2" style={{ minHeight: 0 }}>
        {renderContent()}
      </div>
    </div>
  );
}

export default Elections;

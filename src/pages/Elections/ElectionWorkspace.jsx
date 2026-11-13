import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import StatusPill from "../../components/Election/StatusPill";
import EmptyState, { EmptyStateButton } from "../../components/errors/EmptyState";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { useGetElectionDetails } from "../../hooks/election/useGetElectionDetail";
import { electionStatusMeta, serverErrorCopy } from "../../utils/election/electionDisplay";
import ApplicationsTab from "./workspace/ApplicationsTab";
import CandidatesTab from "./workspace/CandidatesTab";
import OverviewTab from "./workspace/OverviewTab";
import ParticipantsTab from "./workspace/ParticipantsTab";
import ResultsTab from "./workspace/ResultsTab";

const LOCKED = ["voting_open", "voting_closed", "completed", "cancelled"];

const TABS = [
  { key: "overview", label: "Overview" },
  { key: "applications", label: "Applications", count: (e) => e?.applications_count },
  { key: "candidates", label: "Candidates", count: (e) => e?.candidates_count },
  { key: "results", label: "Results" },
  { key: "participants", label: "Participants" },
];


function ElectionWorkspace() {
  const { electionId } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = TABS.some((t) => t.key === searchParams.get("tab")) ? searchParams.get("tab") : "overview";
  const setTab = (key) => setSearchParams({ tab: key }, { replace: true });

  const { data, isLoading, error } = useGetElectionDetails(electionId, {
    refetchInterval: (query) => (query.state.data?.data?.election?.status === "voting_open" ? 15000 : false),
  });
  const details = data?.data;
  const election = details?.election;
  const meta = electionStatusMeta(election?.status);
  const locked = LOCKED.includes(election?.status);


  if (isLoading) {
    return (
      <div className="d-flex flex-column gap-3 h-100">
        <RectangleSkeleton height="9rem" />
        <RectangleSkeleton height="3rem" />
        <RectangleSkeleton height="60%" />
      </div>
    );
  }

  if (error) {
    const notFound = error?.response?.status === 404;
    const copy = serverErrorCopy(
      error,
      notFound ? "Election not found" : "Unable to load this election",
      notFound ? "It may have been deleted, or it belongs to another school branch." : "Something went wrong while loading the election.",
    );
    return (
      <EmptyState
        mascot={notFound ? "notFound" : "error"}
        height="100%"
        mascotHeight="7rem"
        {...copy}
        actions={
          <EmptyStateButton icon={ArrowLeft} onClick={() => navigate("/elections")}>
            Back to elections
          </EmptyStateButton>
        }
      />
    );
  }

  const title = election?.title || election?.election_type?.election_title || "Election";

  return (
    <div className="d-flex flex-column gap-2 h-100" style={{ minHeight: 0 }}>
      {/* Same header bar as the other election pages: flush with the sidebar,
          the title row matches the sidebar's logo row and the tabs sit on its
          bottom border. */}
      <div className="page-head">
        <div className="d-flex flex-row align-items-center justify-content-between gap-3">
          <div className="d-flex flex-row align-items-center gap-2" style={{ minWidth: 0 }}>
            <button
              type="button"
              className="border rounded-2 bg-white p-0 d-grid flex-shrink-0 text-iron-600"
              style={{ width: "1.75rem", height: "1.75rem", placeItems: "center" }}
              onClick={() => navigate("/elections")}
              aria-label="Back to all elections"
              title="All elections"
            >
              <ArrowLeft size={14} />
            </button>
            <span className="fw-semibold font-size-sm text-truncate" title={title}>{title}</span>
            <StatusPill meta={meta} pulse={election?.status === "voting_open"} />
            <span className="text-iron-400 font-size-xs text-truncate d-none d-lg-inline">
              {election?.election_type?.election_title} · {election?.system_academic_year?.name}
            </span>
          </div>
        </div>
        <div className="page-head__tabs d-flex flex-row align-items-center gap-4 font-size-sm" role="tablist" aria-label="Election sections">
        {TABS.map((item) => {
          const active = item.key === tab;
          const count = item.count?.(election);
          return (
            <button
              key={item.key}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTab(item.key)}
              className={`border-none bg-transparent position-relative pb-2 d-flex flex-row align-items-center gap-1 ${active ? "color-primary fw-medium" : "text-iron-500"}`}
            >
              <span>{item.label}</span>
              {count > 0 && (
                <span className={`rounded-pill px-1 font-size-xs ${active ? "bg-primary-50 text-primary-600" : "bg-iron-100 text-iron-600"}`}>{count}</span>
              )}
              {active && (
                <motion.span
                  layoutId="election-workspace-tab"
                  className="position-absolute start-0 end-0 bottom-0 bg-primary-500"
                  style={{ height: 2 }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
        </div>
      </div>

      <div className="flex-grow-1 scroll-bar-sm over-flow-y-auto over-flow-x-hidden pe-1 pb-3" style={{ minHeight: 0 }}>
        {tab === "overview" && <OverviewTab details={details} onTab={setTab} />}
        {tab === "applications" && <ApplicationsTab election={election} />}
        {tab === "candidates" && <CandidatesTab election={election} positions={details?.positions} />}
        {tab === "results" && <ResultsTab election={election} />}
        {tab === "participants" && <ParticipantsTab election={election} locked={locked} />}
      </div>
    </div>
  );
}

export default ElectionWorkspace;

import { motion } from "framer-motion";
import {
  ArrowLeft,
  Ban,
  Crown,
  Lock,
  Pencil,
  Rocket,
  Trash2,
  UsersRound,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ModalButton } from "../../components/DataTableComponents/ActionComponent";
import DrawerTrigger from "../../components/drawer/DrawerTrigger";
import ElectionTimeline from "../../components/Election/ElectionTimeline";
import StatusPill from "../../components/Election/StatusPill";
import EmptyState, { EmptyStateButton } from "../../components/errors/EmptyState";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import ConfigureParticipants from "../../DrawerContent/Election/ConfigureParticipants";
import UpdateElection from "../../DrawerContent/Election/UpdateElection";
import { useGetElectionDetails } from "../../hooks/election/useGetElectionDetail";
import {
  CancelElectionDialog,
  CloseVotingDialog,
  DeleteElectionDialog,
  PublishElectionDialog,
} from "../../ModalContent/Elections/ElectionLifecycleDialogs";
import { electionStatusMeta, nextMilestone, relativeTo, serverErrorCopy } from "../../utils/election/electionDisplay";
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

function HeaderButton({ icon: ButtonIcon, children, variant = "secondary" }) {
  const styles = {
    primary: "border-none primary-background text-white",
    secondary: "border bg-white",
    danger: "border bg-white text-red-500",
  }[variant];
  return (
    <span className={`rounded-3 font-size-sm px-2 py-1 d-flex flex-row align-items-center gap-1 ${styles}`}>
      {ButtonIcon && <ButtonIcon size={14} />}
      <span>{children}</span>
    </span>
  );
}

/** The single most useful next action for an administrator, per lifecycle state. */
function NextStep({ details, onTab }) {
  const election = details?.election;
  const positions = details?.positions ?? [];
  const participants = details?.participants;
  const navigate = useNavigate();

  let step = null;
  switch (election?.status) {
    case "draft":
      if (positions.filter((p) => p.status === "active").length === 0) {
        step = {
          title: "Add positions to contest",
          description: `The ${election?.election_type?.election_title ?? ""} type has no active positions yet.`,
          action: <EmptyStateButton onClick={() => navigate("/election-roles")}>Manage positions</EmptyStateButton>,
        };
      } else if (!participants?.total_voters || !participants?.total_applicants) {
        step = {
          title: "Choose who takes part",
          description: "Decide who can vote and who can apply before publishing.",
          action: (
            <DrawerTrigger title="Election Participants" drawerChildren={ConfigureParticipants} drawerData={{ election }}>
              <EmptyStateButton icon={UsersRound}>Configure participants</EmptyStateButton>
            </DrawerTrigger>
          ),
        };
      } else {
        step = {
          title: "Ready to publish",
          description: `${participants.total_voters} voters and ${participants.total_applicants} possible applicants are set up across ${positions.length} position(s).`,
          action: (
            <ModalButton action={{ modalContent: PublishElectionDialog }} rowData={election}>
              <EmptyStateButton icon={Rocket}>Publish election</EmptyStateButton>
            </ModalButton>
          ),
        };
      }
      break;
    case "upcoming":
      step = {
        title: "Published and waiting",
        description: `${nextMilestone(election)}. Eligible participants will be able to apply from then.`,
        action: <EmptyStateButton onClick={() => onTab("participants")}>View participants</EmptyStateButton>,
      };
      break;
    case "application_open":
    case "application_closed":
      step = {
        title: election.status === "application_open" ? "Applications are coming in" : "Finish reviewing applications",
        description: `Approve or reject applications before voting opens ${relativeTo(election.voting_start) ?? ""}.`,
        action: <EmptyStateButton onClick={() => onTab("applications")}>Review applications</EmptyStateButton>,
      };
      break;
    case "voting_open":
      step = {
        title: "Voting is live",
        description: `${details?.turnout?.voters_participated ?? 0} of ${details?.turnout?.eligible_voters ?? 0} eligible voters have voted so far.`,
        action: <EmptyStateButton onClick={() => onTab("results")}>Follow live results</EmptyStateButton>,
      };
      break;
    case "voting_closed":
      step = {
        title: "Publish the results",
        description: "Check the count and confirm the winners. Winners become office holders for their tenure.",
        action: <EmptyStateButton icon={Crown} onClick={() => onTab("results")}>Review results</EmptyStateButton>,
      };
      break;
    default:
      step = null;
  }
  if (!step) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="d-flex flex-row align-items-center justify-content-between gap-3 bg-primary-50 rounded-4 px-3 py-2"
    >
      <div className="d-flex flex-row align-items-center gap-3" style={{ minWidth: 0 }}>
        <img src="/sss-maskot/happy.png" alt="" aria-hidden="true" draggable={false} style={{ height: "3rem", width: "auto", objectFit: "contain" }} />
        <div className="d-flex flex-column" style={{ minWidth: 0 }}>
          <span className="fw-semibold font-size-sm text-primary-800">{step.title}</span>
          <span className="font-size-xs text-iron-600 text-truncate">{step.description}</span>
        </div>
      </div>
      <div className="flex-shrink-0">{step.action}</div>
    </motion.div>
  );
}

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

  const deleteDialog = useMemo(
    () => (props) => <DeleteElectionDialog {...props} onSuccessNavigate={() => navigate("/elections")} />,
    [navigate],
  );

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
              {election?.election_type?.election_title} · {election?.system_academic_year?.name} · {nextMilestone(election) ?? meta.description}
            </span>
          </div>
          <div className="d-flex flex-row align-items-center gap-2 flex-shrink-0">
            {!locked && (
              <>
                <DrawerTrigger title="Edit Election" drawerChildren={UpdateElection} drawerData={{ election }}>
                  <HeaderButton icon={Pencil}>Edit</HeaderButton>
                </DrawerTrigger>
                <DrawerTrigger title="Election Participants" drawerChildren={ConfigureParticipants} drawerData={{ election }}>
                  <HeaderButton icon={UsersRound}>Participants</HeaderButton>
                </DrawerTrigger>
              </>
            )}
            {election?.status === "draft" && (
              <ModalButton action={{ modalContent: deleteDialog }} rowData={election}>
                <HeaderButton icon={Trash2} variant="danger">Delete</HeaderButton>
              </ModalButton>
            )}
            {!["draft", "completed", "cancelled"].includes(election?.status) && (
              <ModalButton action={{ modalContent: CancelElectionDialog }} rowData={election}>
                <HeaderButton icon={Ban} variant="danger">Cancel</HeaderButton>
              </ModalButton>
            )}
            {election?.status === "cancelled" && (
              <ModalButton action={{ modalContent: deleteDialog }} rowData={election}>
                <HeaderButton icon={Trash2} variant="danger">Delete</HeaderButton>
              </ModalButton>
            )}
            {election?.status === "voting_open" && (
              <ModalButton action={{ modalContent: CloseVotingDialog }} rowData={election}>
                <HeaderButton icon={Lock} variant="primary">Close voting</HeaderButton>
              </ModalButton>
            )}
            {election?.status === "draft" && (
              <ModalButton action={{ modalContent: PublishElectionDialog }} rowData={election}>
                <HeaderButton icon={Rocket} variant="primary">Publish</HeaderButton>
              </ModalButton>
            )}
          </div>
        </div>
        <div className="pt-1 pb-3" style={{ paddingInline: "var(--app-gutter)" }}>
          <ElectionTimeline election={election} />
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

      <NextStep details={details} onTab={setTab} />

      <div className="flex-grow-1 scroll-bar-sm over-flow-y-auto over-flow-x-hidden pe-1 pb-3" style={{ minHeight: 0 }}>
        {tab === "overview" && <OverviewTab details={details} />}
        {tab === "applications" && <ApplicationsTab election={election} />}
        {tab === "candidates" && <CandidatesTab election={election} positions={details?.positions} />}
        {tab === "results" && <ResultsTab election={election} />}
        {tab === "participants" && <ParticipantsTab election={election} locked={locked} />}
      </div>
    </div>
  );
}

export default ElectionWorkspace;

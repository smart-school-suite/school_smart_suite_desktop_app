import { differenceInMinutes, isValid, parseISO } from "date-fns";
import { motion, useReducedMotion } from "framer-motion";
import { Award, BarChart3, Check, ClipboardCheck, Crown, Rocket, UsersRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ModalButton } from "../../../components/DataTableComponents/ActionComponent";
import DrawerTrigger from "../../../components/drawer/DrawerTrigger";
import StatusPill from "../../../components/Election/StatusPill";
import { EmptyStateButton } from "../../../components/errors/EmptyState";
import ConfigureParticipants from "../../../DrawerContent/Election/ConfigureParticipants";
import { PublishElectionDialog } from "../../../ModalContent/Elections/ElectionLifecycleDialogs";
import {
  ELECTION_PHASES,
  electionStatusMeta,
  formatElectionDate,
  formatElectionDateTime,
  phaseIndexOf,
  relativeTo,
} from "../../../utils/election/electionDisplay";

const toDate = (value) => {
  if (!value) return null;
  const date = parseISO(String(value).replace(" ", "T"));
  return isValid(date) ? date : null;
};

/** What is happening now: headline, explanation and the window it runs in. */
function stageFor(election, details) {
  const turnout = details?.turnout;
  switch (election?.status) {
    case "draft":
      return { title: "Setting up", description: "Only administrators can see this election. Finish the setup below, then publish it." };
    case "upcoming":
      return {
        title: "Published, waiting for applications",
        description: "Participants can see the election. Applications open automatically on the scheduled date.",
        deadline: { label: "Applications open", at: election.application_start },
      };
    case "application_open":
      return {
        title: "Applications are open",
        description: `${election.applications_count ?? 0} application(s) received so far. Eligible participants can apply until the deadline.`,
        window: [election.application_start, election.application_end],
        deadline: { label: "Applications close", at: election.application_end },
      };
    case "application_closed":
      return {
        title: "Reviewing applications",
        description: "Applications are closed. Approve or reject them before voting opens; approved applicants appear on the ballot.",
        window: [election.application_end, election.voting_start],
        deadline: { label: "Voting opens", at: election.voting_start },
      };
    case "voting_open":
      return {
        title: "Voting is live",
        description: `${turnout?.voters_participated ?? 0} of ${turnout?.eligible_voters ?? 0} eligible voters have voted (${turnout?.turnout_percentage ?? 0}% turnout).`,
        window: [election.voting_start, election.voting_end],
        deadline: { label: "Voting closes", at: election.voting_end },
      };
    case "voting_closed":
      return {
        title: "Voting has closed",
        description: "Every ballot is counted. The results are provisional until you publish them.",
      };
    case "completed":
      return {
        title: "Election completed",
        description: `Results were published ${relativeTo(election.results_published_at) ?? ""} and the winners now hold office.`,
      };
    case "cancelled":
      return { title: "Election cancelled", description: "Nobody can apply or vote. Applications, candidates and ballots are kept for history." };
    default:
      return { title: electionStatusMeta(election?.status).label, description: "" };
  }
}

/** The single most useful thing for the administrator to do now. */
function nextStepFor(details, { navigate, onTab }) {
  const election = details?.election;
  const positions = (details?.positions ?? []).filter((position) => position.status === "active");
  const participants = details?.participants;

  switch (election?.status) {
    case "draft":
      if (positions.length === 0) {
        return {
          title: "Add positions to contest",
          description: `The ${election?.election_type?.election_title ?? "election"} type has no active positions yet.`,
          action: <EmptyStateButton icon={Award} onClick={() => navigate("/election-roles")}>Manage positions</EmptyStateButton>,
        };
      }
      if (!participants?.total_voters || !participants?.total_applicants) {
        return {
          title: "Choose who takes part",
          description: "Decide who can vote and who can apply for candidacy.",
          action: (
            <DrawerTrigger title="Election Participants" drawerChildren={ConfigureParticipants} drawerData={{ election }}>
              <EmptyStateButton icon={UsersRound}>Configure participants</EmptyStateButton>
            </DrawerTrigger>
          ),
        };
      }
      return {
        title: "Publish the election",
        description: "Everything is set up. Publishing makes the election visible to its participants.",
        action: (
          <ModalButton action={{ modalContent: PublishElectionDialog }} rowData={election}>
            <EmptyStateButton icon={Rocket}>Publish election</EmptyStateButton>
          </ModalButton>
        ),
      };
    case "upcoming":
      return {
        title: "Check who takes part",
        description: "Make sure the right people can vote and apply before applications open.",
        action: <EmptyStateButton icon={UsersRound} onClick={() => onTab("participants")}>View participants</EmptyStateButton>,
      };
    case "application_open":
    case "application_closed":
      return {
        title: "Review applications",
        description: "Approve or reject applications so candidates are ready before voting opens.",
        action: <EmptyStateButton icon={ClipboardCheck} onClick={() => onTab("applications")}>Review applications</EmptyStateButton>,
      };
    case "voting_open":
      return {
        title: "Follow the count",
        description: "Results update live while voting is open.",
        action: <EmptyStateButton icon={BarChart3} onClick={() => onTab("results")}>Live results</EmptyStateButton>,
      };
    case "voting_closed":
      return {
        title: "Publish the results",
        description: "Confirm the winners, resolving any ties. Winners become office holders.",
        action: <EmptyStateButton icon={Crown} onClick={() => onTab("results")}>Review & publish</EmptyStateButton>,
      };
    case "completed":
      return {
        title: "See who holds office",
        description: "Winners serve their tenure from the start of the academic year.",
        action: <EmptyStateButton icon={Award} onClick={() => navigate("/election-office-holders")}>Office holders</EmptyStateButton>,
      };
    default:
      return null;
  }
}

function SetupChecklist({ details }) {
  const participants = details?.participants;
  const items = [
    { label: "Schedule set", done: Boolean(details?.election?.voting_end) },
    { label: "Positions on the ballot", done: (details?.positions ?? []).some((p) => p.status === "active") },
    { label: "Voters chosen", done: (participants?.total_voters ?? 0) > 0 },
    { label: "Candidates chosen", done: (participants?.total_applicants ?? 0) > 0 },
  ];
  return (
    <ul className="list-unstyled m-0 p-0 d-flex flex-row flex-wrap gap-3">
      {items.map((item) => (
        <li key={item.label} className={`d-flex flex-row align-items-center gap-1 font-size-xs ${item.done ? "text-iron-700" : "text-iron-400"}`}>
          <span
            className={`d-grid rounded-circle ${item.done ? "bg-fern-500 text-white" : "border border-iron-300"}`}
            style={{ width: "1rem", height: "1rem", placeItems: "center" }}
          >
            {item.done && <Check size={10} strokeWidth={3} />}
          </span>
          {item.label}
        </li>
      ))}
    </ul>
  );
}

function StageProgress({ window: [start, end], deadline }) {
  const reduceMotion = useReducedMotion();
  const from = toDate(start);
  const to = toDate(end);
  const total = from && to ? Math.max(1, differenceInMinutes(to, from)) : 1;
  const elapsed = from ? differenceInMinutes(new Date(), from) : 0;
  const share = Math.max(0, Math.min(100, (elapsed / total) * 100));
  return (
    <div className="d-flex flex-column gap-1">
      <div className="rounded-pill overflow-hidden bg-iron-100" style={{ height: 8 }}>
        <motion.div
          className="h-100 rounded-pill bg-primary-500"
          initial={{ width: 0 }}
          animate={{ width: `${share}%` }}
          transition={{ duration: reduceMotion ? 0 : 0.7, ease: [0.2, 0, 0, 1] }}
        />
      </div>
      <div className="d-flex flex-row justify-content-between text-iron-500" style={{ fontSize: "0.7rem" }}>
        <span>{formatElectionDate(start, "d MMM, HH:mm")}</span>
        <span>{deadline?.label} {formatElectionDate(end, "d MMM, HH:mm")}</span>
      </div>
    </div>
  );
}

/**
 * Top of the election overview: where the election is, how far through the
 * current stage it is, and what the administrator should do next.
 */
export default function ElectionStatusHero({ details, onTab }) {
  const navigate = useNavigate();
  const election = details?.election;
  const meta = electionStatusMeta(election?.status);
  const stage = stageFor(election, details);
  const next = nextStepFor(details, { navigate, onTab });
  const phaseIndex = Math.min(phaseIndexOf(election?.status), ELECTION_PHASES.length - 1);
  const phase = ELECTION_PHASES[phaseIndex];
  const cancelled = election?.status === "cancelled";

  return (
    <section className="bg-white border rounded-4 d-flex flex-row overflow-hidden" aria-label="Election status">
      <div className="d-flex flex-column gap-3 p-4 flex-grow-1" style={{ minWidth: 0 }}>
        <div className="d-flex flex-row align-items-center gap-2 text-iron-500 font-size-xs fw-semibold text-uppercase" style={{ letterSpacing: "0.05em" }}>
          {cancelled ? <span>Stopped</span> : <span>Stage {phaseIndex + 1} of {ELECTION_PHASES.length} · {phase.label}</span>}
          <StatusPill meta={meta} pulse={election?.status === "voting_open"} />
        </div>
        <div className="d-flex flex-column gap-1">
          <h2 className="m-0 fw-semibold" style={{ fontSize: "1.4rem", lineHeight: 1.25 }}>{stage.title}</h2>
          {stage.description && (
            <p className="m-0 text-iron-600 font-size-sm" style={{ lineHeight: 1.6, maxWidth: "38rem" }}>{stage.description}</p>
          )}
        </div>
        {stage.deadline?.at && (
          <div className="d-flex flex-row align-items-baseline gap-2">
            <span className="fw-semibold text-primary-700" style={{ fontSize: "1.05rem" }}>
              {stage.deadline.label} {relativeTo(stage.deadline.at)}
            </span>
            <span className="text-iron-500 font-size-xs">{formatElectionDateTime(stage.deadline.at)}</span>
          </div>
        )}
        {stage.window && <StageProgress window={stage.window} deadline={stage.deadline} />}
        {election?.status === "draft" && <SetupChecklist details={details} />}
      </div>

      {next && (
        <div className="d-flex flex-column justify-content-between gap-3 p-4 bg-primary-50 flex-shrink-0" style={{ width: "21rem" }}>
          <div className="d-flex flex-row gap-3">
            <img src="/sss-maskot/happy.png" alt="" aria-hidden="true" draggable={false} style={{ height: "3.25rem", width: "auto", objectFit: "contain", flexShrink: 0 }} />
            <div className="d-flex flex-column gap-1" style={{ minWidth: 0 }}>
              <span className="text-primary-600 font-size-xs fw-semibold text-uppercase" style={{ letterSpacing: "0.05em" }}>Next step</span>
              <span className="fw-semibold font-size-sm text-primary-900">{next.title}</span>
              <span className="text-iron-600 font-size-xs" style={{ lineHeight: 1.55 }}>{next.description}</span>
            </div>
          </div>
          <div className="align-self-start">{next.action}</div>
        </div>
      )}
    </section>
  );
}

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import {
  ELECTION_PHASES,
  formatElectionDate,
  phaseIndexOf,
} from "../../utils/election/electionDisplay";

const SHORT = "d MMM, HH:mm";

// When each phase starts and ends (end may be open).
const phaseWindows = (election) => ({
  setup: [election?.created_at, election?.application_start],
  applications: [election?.application_start, election?.application_end],
  review: [election?.application_end, election?.voting_start],
  voting: [election?.voting_start, election?.voting_end],
  results: [election?.voting_end, election?.results_published_at],
});

const PHASE_HINT = {
  setup: "Configure and publish",
  applications: "Participants apply",
  review: "Approve candidates",
  voting: "Ballots are cast",
  results: "Publish the winners",
};

/**
 * Lifecycle of an election: Setup → Applications → Review → Voting → Results.
 *
 *   <ElectionTimeline election={election} compact />  // progress bar only (cards)
 *   <ElectionTimeline election={election} />          // full journey with dates (overview)
 */
export default function ElectionTimeline({ election, compact = false }) {
  const reduceMotion = useReducedMotion();
  const cancelled = election?.status === "cancelled";
  const current = phaseIndexOf(election?.status);

  if (compact) {
    return (
      <div className="d-flex flex-row gap-1" aria-label={`Phase ${Math.min(current + 1, ELECTION_PHASES.length)} of ${ELECTION_PHASES.length}`}>
        {ELECTION_PHASES.map((phase, index) => (
          <div key={phase.key} title={phase.label} className="flex-grow-1 rounded-pill overflow-hidden bg-iron-200" style={{ height: 4 }}>
            <motion.div
              className={`h-100 ${cancelled ? "bg-iron-400" : "bg-primary-500"}`}
              initial={false}
              animate={{ width: index < current ? "100%" : index === current ? "50%" : "0%" }}
              transition={{ duration: reduceMotion ? 0 : 0.5 }}
            />
          </div>
        ))}
      </div>
    );
  }

  const windows = phaseWindows(election);

  return (
    <ol className="list-unstyled m-0 p-0 d-grid gap-2" style={{ gridTemplateColumns: `repeat(${ELECTION_PHASES.length}, minmax(0, 1fr))` }} aria-label="Election phases">
      {ELECTION_PHASES.map((phase, index) => {
        const isDone = !cancelled && index < current;
        const isActive = !cancelled && index === current;
        const [start, end] = windows[phase.key];
        const state = cancelled ? "Cancelled" : isDone ? "Done" : isActive ? "In progress" : "Up next";
        return (
          <li
            key={phase.key}
            aria-current={isActive ? "step" : undefined}
            className={`d-flex flex-column gap-2 rounded-3 p-2 ${isActive ? "bg-primary-50" : ""}`}
            style={{ minWidth: 0 }}
          >
            <div className="d-flex flex-row align-items-center gap-2">
              <span
                className={`d-grid rounded-circle flex-shrink-0 fw-semibold ${
                  isDone ? "bg-primary-500 text-white" : isActive ? "bg-white border border-primary-500 text-primary-600" : "bg-white border border-iron-300 text-iron-400"
                }`}
                style={{ width: "1.5rem", height: "1.5rem", placeItems: "center", fontSize: "0.7rem" }}
              >
                {isDone ? <Check size={12} strokeWidth={3} /> : index + 1}
              </span>
              <div className={`flex-grow-1 rounded-pill ${isDone ? "bg-primary-300" : "bg-iron-200"}`} style={{ height: 2 }} aria-hidden="true" />
            </div>
            <div className="d-flex flex-column" style={{ minWidth: 0 }}>
              <span className={`font-size-sm fw-semibold text-truncate ${isActive ? "text-primary-700" : isDone ? "text-iron-800" : "text-iron-500"}`}>
                {phase.label}
              </span>
              <span className="text-iron-500 text-truncate" style={{ fontSize: "0.7rem" }}>{PHASE_HINT[phase.key]}</span>
              <span className="text-iron-600 text-truncate mt-1" style={{ fontSize: "0.7rem" }} title={`${formatElectionDate(start, SHORT)} → ${formatElectionDate(end, SHORT)}`}>
                {formatElectionDate(start, "d MMM")}
                {end ? ` → ${formatElectionDate(end, "d MMM")}` : ""}
              </span>
            </div>
            <span
              className={`align-self-start rounded-pill px-2 fw-semibold ${
                isActive ? "bg-primary-500 text-white" : isDone ? "bg-fern-50 text-fern-600" : "bg-iron-100 text-iron-500"
              }`}
              style={{ fontSize: "0.65rem", lineHeight: "1.25rem" }}
            >
              {state}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

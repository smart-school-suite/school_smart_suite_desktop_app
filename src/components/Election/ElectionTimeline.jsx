import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import {
  ELECTION_PHASES,
  formatElectionDate,
  phaseIndexOf,
} from "../../utils/election/electionDisplay";

const phaseDates = (election) => ({
  setup: election?.created_at,
  applications: election?.application_start,
  review: election?.application_end,
  voting: election?.voting_start,
  results: election?.voting_end,
});

/**
 * Lifecycle progress of an election: Setup → Applications → Review → Voting → Results.
 *
 *   <ElectionTimeline election={election} />          // with dates
 *   <ElectionTimeline election={election} compact />  // bar only (cards)
 */
export default function ElectionTimeline({ election, compact = false }) {
  const reduceMotion = useReducedMotion();
  const cancelled = election?.status === "cancelled";
  const current = phaseIndexOf(election?.status);
  const dates = phaseDates(election);

  if (compact) {
    return (
      <div className="d-flex flex-row gap-1" aria-label={`Phase ${Math.min(current + 1, ELECTION_PHASES.length)} of ${ELECTION_PHASES.length}`}>
        {ELECTION_PHASES.map((phase, index) => (
          <div
            key={phase.key}
            title={phase.label}
            className="flex-grow-1 rounded-pill overflow-hidden bg-iron-200"
            style={{ height: 4 }}
          >
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

  return (
    <ol className="d-flex flex-row list-unstyled m-0 p-0 w-100" aria-label="Election phases">
      {ELECTION_PHASES.map((phase, index) => {
        const isDone = !cancelled && index < current;
        const isActive = !cancelled && index === current;
        return (
          <li key={phase.key} className="d-flex flex-column flex-grow-1 gap-2" style={{ minWidth: 0 }}>
            <div className="d-flex flex-row align-items-center">
              <motion.span
                className="d-grid rounded-circle fw-semibold flex-shrink-0"
                initial={false}
                animate={{
                  backgroundColor: isDone || isActive ? "var(--primary-color-500)" : "#fff",
                  color: isDone || isActive ? "#fff" : "var(--iron-400)",
                  borderColor: isDone || isActive ? "var(--primary-color-500)" : "var(--iron-300)",
                  boxShadow: isActive ? "0 0 0 4px var(--primary-color-100)" : "0 0 0 0 transparent",
                }}
                style={{ width: "1.6rem", height: "1.6rem", placeItems: "center", fontSize: "0.72rem", border: "1.5px solid" }}
                aria-current={isActive ? "step" : undefined}
              >
                {isDone ? <Check size={12} strokeWidth={3} /> : index + 1}
              </motion.span>
              {index < ELECTION_PHASES.length - 1 && (
                <div className="flex-grow-1 mx-2 rounded-pill overflow-hidden bg-iron-200" style={{ height: 2 }}>
                  <motion.div
                    className="h-100 bg-primary-500"
                    initial={false}
                    animate={{ width: isDone ? "100%" : "0%" }}
                    transition={{ duration: reduceMotion ? 0 : 0.5 }}
                  />
                </div>
              )}
            </div>
            <div className="d-flex flex-column pe-2" style={{ minWidth: 0 }}>
              <span className={`font-size-xs fw-semibold text-truncate ${isActive ? "text-primary-600" : "text-iron-700"}`}>
                {phase.label}
              </span>
              <span className="text-iron-400 text-truncate" style={{ fontSize: "0.68rem" }}>
                {formatElectionDate(dates[phase.key], "d MMM, HH:mm")}
              </span>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

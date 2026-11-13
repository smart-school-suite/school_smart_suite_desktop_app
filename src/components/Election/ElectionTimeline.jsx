import { motion, useReducedMotion } from "framer-motion";
import { CalendarDays, Check } from "lucide-react";
import { Fragment } from "react";
import {
  ELECTION_PHASES,
  formatElectionDate,
  formatElectionDateTime,
  phaseIndexOf,
} from "../../utils/election/electionDisplay";
import Popover from "../Popover/Popover";

const SHORT = "d MMM, HH:mm";

// What matters about the current phase, shown next to its label.
const currentCaption = (election) => {
  switch (election?.status) {
    case "draft":
      return "not published";
    case "upcoming":
      return `opens ${formatElectionDate(election.application_start, SHORT)}`;
    case "application_open":
      return `until ${formatElectionDate(election.application_end, SHORT)}`;
    case "application_closed":
      return `voting ${formatElectionDate(election.voting_start, SHORT)}`;
    case "voting_open":
      return `until ${formatElectionDate(election.voting_end, SHORT)}`;
    case "voting_closed":
      return "awaiting publication";
    default:
      return null;
  }
};

function SchedulePopover({ election }) {
  const rows = [
    ["Applications open", election?.application_start],
    ["Applications close", election?.application_end],
    ["Voting opens", election?.voting_start],
    ["Voting closes", election?.voting_end],
    ["Results published", election?.results_published_at],
  ];
  return (
    <Popover
      ariaLabel="Show the full election schedule"
      placement="bottom-end"
      triggerClassName="border-none bg-transparent p-0 d-flex flex-row align-items-center gap-1 text-iron-500 font-size-xs flex-shrink-0"
      trigger={
        <>
          <CalendarDays size={13} />
          <span>Schedule</span>
        </>
      }
    >
      <dl className="m-0 d-flex flex-column gap-1" style={{ minWidth: "14rem" }}>
        {rows.map(([label, value]) => (
          <div key={label} className="d-flex flex-row justify-content-between gap-3">
            <dt className="fw-normal text-iron-500">{label}</dt>
            <dd className="m-0 fw-medium text-nowrap">{value ? formatElectionDateTime(value) : "—"}</dd>
          </div>
        ))}
      </dl>
    </Popover>
  );
}

/**
 * Lifecycle progress of an election: Setup → Applications → Review → Voting → Results.
 *
 *   <ElectionTimeline election={election} />          // one-line stepper + schedule popover
 *   <ElectionTimeline election={election} compact />  // progress bar only (cards)
 *
 * Only the current phase is emphasised and carries its deadline; the full
 * schedule is one click away in the popover.
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

  const caption = currentCaption(election);
  const live = election?.status === "voting_open";

  return (
    <div className="d-flex flex-row align-items-center justify-content-between gap-3 font-size-xs" style={{ minHeight: "1.75rem" }}>
      <ol className="d-flex flex-row align-items-center list-unstyled m-0 p-0 gap-2" aria-label="Election phases" style={{ minWidth: 0 }}>
        {ELECTION_PHASES.map((phase, index) => {
          const isDone = !cancelled && index < current;
          const isActive = !cancelled && index === current;
          return (
            <Fragment key={phase.key}>
              {index > 0 && (
                <li aria-hidden="true" className={`rounded-pill flex-shrink-0 ${index <= current && !cancelled ? "bg-primary-300" : "bg-iron-200"}`} style={{ width: "1.25rem", height: 1.5 }} />
              )}
              <li
                className={`d-flex flex-row align-items-center gap-1 text-nowrap ${
                  isActive ? "text-primary-600 fw-semibold" : isDone ? "text-iron-600" : "text-iron-400"
                }`}
                aria-current={isActive ? "step" : undefined}
              >
                <span
                  className={`d-grid rounded-circle flex-shrink-0 position-relative ${
                    isDone ? "bg-primary-500 text-white" : isActive ? "bg-primary-50 border border-primary-500" : "border border-iron-300"
                  }`}
                  style={{ width: "0.9rem", height: "0.9rem", placeItems: "center" }}
                >
                  {isDone && <Check size={9} strokeWidth={3.5} />}
                  {isActive && (
                    <motion.span
                      className="rounded-circle bg-primary-500"
                      style={{ width: 5, height: 5 }}
                      animate={live && !reduceMotion ? { scale: [1, 1.5, 1] } : undefined}
                      transition={{ duration: 1.4, repeat: Infinity }}
                    />
                  )}
                </span>
                <span>{phase.label}</span>
                {isActive && caption && <span className="fw-normal text-iron-500">· {caption}</span>}
              </li>
            </Fragment>
          );
        })}
      </ol>
      <SchedulePopover election={election} />
    </div>
  );
}

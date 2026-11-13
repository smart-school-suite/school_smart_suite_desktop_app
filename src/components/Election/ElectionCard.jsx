import { CalendarRange, FileText, UserRoundCheck, Vote } from "lucide-react";
import {
  electionStatusMeta,
  formatRange,
  nextMilestone,
} from "../../utils/election/electionDisplay";
import ElectionActions from "./ElectionActions";
import ElectionTimeline from "./ElectionTimeline";
import StatusPill from "./StatusPill";

/**
 * Fixed-size election summary used in grids (builds on .teacher-card).
 *
 *   <ElectionCard election={election} onOpen={(election) => navigate(...)} />
 *
 * The footer carries the election's actions, so it can be managed from the list.
 */
export default function ElectionCard({ election, onOpen }) {
  const meta = electionStatusMeta(election?.status);
  const title = election?.title || election?.election_type?.election_title || "Untitled election";
  const stats = [
    { icon: FileText, label: "Applications", value: election?.applications_count ?? 0 },
    { icon: UserRoundCheck, label: "Candidates", value: election?.candidates_count ?? 0 },
    { icon: Vote, label: "Ballots", value: election?.votes_count ?? 0 },
  ];
  const open = () => onOpen?.(election);

  return (
    <div
      className="teacher-card teacher-card--selectable"
      role="button"
      tabIndex={0}
      onClick={open}
      onKeyDown={(event) => {
        if (event.target !== event.currentTarget) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          open();
        }
      }}
      aria-label={`Open ${title}`}
    >
      <div className="d-flex flex-row align-items-start justify-content-between gap-2">
        <div className="d-flex flex-column" style={{ minWidth: 0 }}>
          <span className="fw-semibold text-truncate" title={title}>{title}</span>
          <span className="text-iron-500 font-size-xs text-truncate">
            {election?.election_type?.election_title ?? "—"}
            {election?.system_academic_year?.name ? ` · ${election.system_academic_year.name}` : ""}
          </span>
        </div>
        <StatusPill meta={meta} pulse={election?.status === "voting_open"} />
      </div>

      <ElectionTimeline election={election} compact />

      <div className="d-flex flex-column gap-1 font-size-xs text-iron-500">
        <div className="d-flex flex-row align-items-center gap-2">
          <CalendarRange size={14} className="flex-shrink-0" />
          <span className="text-truncate">Voting {formatRange(election?.voting_start, election?.voting_end)}</span>
        </div>
        <span className="text-iron-700 fw-medium text-truncate" title={nextMilestone(election) ?? ""}>
          {nextMilestone(election) ?? meta.description}
        </span>
      </div>

      <div className="teacher-card__footer">
        <div className="teacher-card__divider" />
        <div className="d-flex flex-row align-items-center justify-content-between">
          <div className="d-flex flex-row align-items-center gap-3">
            {stats.map(({ icon: StatIcon, label, value }) => (
              <span key={label} className="d-flex flex-row align-items-center gap-1 font-size-xs text-iron-500" title={label}>
                <StatIcon size={14} />
                <span className="fw-semibold text-iron-700">{value}</span>
              </span>
            ))}
          </div>
          <ElectionActions election={election} />
        </div>
      </div>
    </div>
  );
}

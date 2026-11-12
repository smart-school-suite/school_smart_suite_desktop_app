import { Award, FileText, GraduationCap, Percent, UserRoundCheck, Vote } from "lucide-react";
import SectionCard from "../../../components/Election/SectionCard";
import StatTile from "../../../components/Election/StatTile";
import EmptyState, { EmptyStateButton } from "../../../components/errors/EmptyState";
import { useNavigate } from "react-router-dom";
import { PARTICIPANT_TYPES, formatElectionDateTime } from "../../../utils/election/electionDisplay";

const breakdown = (summary, key) =>
  Object.entries(summary ?? {})
    .filter(([, counts]) => (counts?.[key] ?? 0) > 0)
    .map(([type, counts]) => `${PARTICIPANT_TYPES[type]?.plural ?? type} ${counts[key]}`)
    .join(" · ");

function PositionRow({ position }) {
  const term = position?.office_term;
  const termText = term
    ? `${term.duration_academic_years} academic year${term.duration_academic_years > 1 ? "s" : ""} · ${
        term.allow_reelection ? `up to ${term.maximum_terms ?? "unlimited"} terms` : "no re-election"
      }`
    : "1 academic year · no re-election (default)";
  return (
    <div className="d-flex flex-row align-items-center justify-content-between gap-3 py-2 border-bottom">
      <div className="d-flex flex-column" style={{ minWidth: 0 }}>
        <div className="d-flex flex-row align-items-center gap-2">
          <span className="fw-semibold font-size-sm text-truncate">{position.name}</span>
          {position.status !== "active" && <span className="pill-sm-warning">Inactive</span>}
        </div>
        <span className="text-iron-500 font-size-xs text-truncate">{termText}</span>
      </div>
      <div className="d-flex flex-row align-items-center gap-3 font-size-xs text-iron-500 flex-shrink-0">
        <span title="Seats"><span className="fw-semibold text-iron-700">{position.seats ?? 1}</span> seat{(position.seats ?? 1) > 1 ? "s" : ""}</span>
        <span title="Applications"><span className="fw-semibold text-iron-700">{position.applications_count ?? 0}</span> applied</span>
        <span title="Candidates"><span className="fw-semibold text-iron-700">{position.candidates_count ?? 0}</span> standing</span>
      </div>
    </div>
  );
}

export default function OverviewTab({ details }) {
  const navigate = useNavigate();
  const election = details?.election;
  const participants = details?.participants;
  const turnout = details?.turnout;
  const positions = details?.positions ?? [];

  return (
    <div className="d-flex flex-column gap-3">
      <div className="d-grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(12rem, 1fr))" }}>
        <StatTile icon={Vote} label="Eligible voters" value={participants?.total_voters ?? 0} hint={breakdown(participants?.summary, "voters") || "Not configured"} />
        <StatTile icon={GraduationCap} label="Eligible applicants" value={participants?.total_applicants ?? 0} hint={breakdown(participants?.summary, "applicants") || "Not configured"} />
        <StatTile icon={FileText} label="Applications" value={election?.applications_count ?? 0} tone="warning" />
        <StatTile icon={UserRoundCheck} label="Candidates" value={election?.candidates_count ?? 0} tone="success" />
        <StatTile
          icon={Percent}
          label="Turnout"
          value={turnout?.turnout_percentage ?? 0}
          suffix="%"
          hint={`${turnout?.voters_participated ?? 0} of ${turnout?.eligible_voters ?? 0} voters`}
          tone="neutral"
        />
      </div>

      <div className="d-grid gap-3" style={{ gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1fr)" }}>
        <SectionCard
          title="Positions on the ballot"
          description={`From the ${election?.election_type?.election_title ?? "election"} type. Tenure rules come from each position's office term.`}
          actions={
            <button type="button" className="border rounded-3 bg-white font-size-xs px-2 py-1" onClick={() => navigate("/election-roles")}>
              Manage positions
            </button>
          }
        >
          {positions.length === 0 ? (
            <EmptyState
              mascot="sad"
              height="14rem"
              mascotHeight="6rem"
              title="No positions yet"
              description="Add positions such as President or Secretary to this election type so people can apply."
              actions={<EmptyStateButton icon={Award} onClick={() => navigate("/election-roles")}>Add Positions</EmptyStateButton>}
            />
          ) : (
            <div className="d-flex flex-column">
              {positions.map((position) => (
                <PositionRow key={position.id} position={position} />
              ))}
            </div>
          )}
        </SectionCard>

        <SectionCard title="Settings">
          <dl className="d-flex flex-column gap-2 m-0 font-size-sm">
            {[
              ["Academic year", election?.system_academic_year?.name],
              ["Positions per applicant", election?.max_applications_per_participant ?? 1],
              ["Self-votes", election?.allow_candidate_self_vote ? "Allowed" : "Not allowed"],
              ["Applications", `${formatElectionDateTime(election?.application_start)} → ${formatElectionDateTime(election?.application_end)}`],
              ["Voting", `${formatElectionDateTime(election?.voting_start)} → ${formatElectionDateTime(election?.voting_end)}`],
              ["Results", election?.results_published_at ? formatElectionDateTime(election.results_published_at) : "Not published"],
            ].map(([label, value]) => (
              <div key={label} className="d-flex flex-column">
                <dt className="text-iron-500 font-size-xs fw-normal">{label}</dt>
                <dd className="m-0">{value ?? "—"}</dd>
              </div>
            ))}
          </dl>
          {election?.description && (
            <p className="m-0 mt-3 text-iron-600 font-size-sm" style={{ lineHeight: 1.6 }}>{election.description}</p>
          )}
        </SectionCard>
      </div>
    </div>
  );
}

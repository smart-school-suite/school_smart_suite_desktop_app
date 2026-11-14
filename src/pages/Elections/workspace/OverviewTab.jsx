import { Award, FileText, GraduationCap, Percent, UserRoundCheck, Vote } from "lucide-react";
import ElectionTimeline from "../../../components/Election/ElectionTimeline";
import SectionCard from "../../../components/Election/SectionCard";
import ElectionStatusHero from "./ElectionStatusHero";
import StatTile from "../../../components/Election/StatTile";
import EmptyState, { EmptyStateButton } from "../../../components/errors/EmptyState";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../../components/Tables/Tables";
import { electionBallotPositionColDefs } from "../../../utils/table/colDefs/election/electionBallotPositionColDefs";
import { PARTICIPANT_TYPES } from "../../../utils/election/electionDisplay";

const breakdown = (summary, key) =>
  Object.entries(summary ?? {})
    .filter(([, counts]) => (counts?.[key] ?? 0) > 0)
    .map(([type, counts]) => `${PARTICIPANT_TYPES[type]?.plural ?? type} ${counts[key]}`)
    .join(" · ");

const tenureText = (term) =>
  term
    ? `${term.duration_academic_years} academic year${term.duration_academic_years > 1 ? "s" : ""} · ${
        term.allow_reelection ? `up to ${term.maximum_terms ?? "unlimited"} terms` : "no re-election"
      }`
    : "1 academic year · no re-election (default)";

export default function OverviewTab({ details, onTab }) {
  const navigate = useNavigate();
  const election = details?.election;
  const participants = details?.participants;
  const turnout = details?.turnout;
  const positions = details?.positions ?? [];
  const colDefs = useMemo(() => electionBallotPositionColDefs(), []);
  const rowData = useMemo(
    () =>
      positions.map((position) => ({
        ...position,
        seats: position.seats ?? 1,
        tenure: tenureText(position.office_term),
        applications_count: position.applications_count ?? 0,
        candidates_count: position.candidates_count ?? 0,
      })),
    [positions],
  );

  return (
    <div className="d-flex flex-column gap-3">
      {/* 1. Where the election is and what to do next */}
      <ElectionStatusHero details={details} onTab={onTab} />

      {/* 2. How the whole election unfolds */}
      <SectionCard title="Election journey" description="Each stage starts automatically on its scheduled date.">
        <ElectionTimeline election={election} />
      </SectionCard>

      {/* 3. Key numbers */}
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

      {/* 4. What is on the ballot */}
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
          // header + rows + pagination bar, capped so long ballots scroll inside the grid
          <div style={{ height: `${Math.min(positions.length, 8) * 42 + 48 + 56}px` }}>
            <Table colDefs={colDefs} rowData={rowData} rowHeight={42} />
          </div>
        )}
      </SectionCard>
    </div>
  );
}

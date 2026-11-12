import { ChevronLeft, ChevronRight, RefreshCw, UsersRound } from "lucide-react";
import { useState } from "react";
import DrawerTrigger from "../../../components/drawer/DrawerTrigger";
import ParticipantIdentity from "../../../components/Election/ParticipantIdentity";
import SectionCard from "../../../components/Election/SectionCard";
import StatusPill from "../../../components/Election/StatusPill";
import EmptyState, { EmptyStateButton } from "../../../components/errors/EmptyState";
import RectangleSkeleton from "../../../components/SkeletonPageLoader/RectangularSkeleton";
import { SingleSpinner } from "../../../components/Spinners/Spinners";
import ConfigureParticipants from "../../../DrawerContent/Election/ConfigureParticipants";
import { useGetElectionParticipants } from "../../../hooks/election/useGetElectionParticipants";
import { useRefreshElectionParticipants } from "../../../hooks/election/useRefreshElectionParticipants";
import { PARTICIPANT_TYPES, serverErrorCopy } from "../../../utils/election/electionDisplay";

const FILTERS = [
  { key: "all", label: "Everyone", params: {} },
  { key: "voters", label: "Voters", params: { can_vote: 1 } },
  { key: "applicants", label: "Can apply", params: { can_apply: 1 } },
];

function ConfigureTrigger({ election, children }) {
  return (
    <DrawerTrigger title="Election Participants" placement="right" drawerChildren={ConfigureParticipants} drawerData={{ election }}>
      {children}
    </DrawerTrigger>
  );
}


export default function ParticipantsTab({ election, locked }) {
  const [filter, setFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("");
  const [page, setPage] = useState(1);
  const params = { ...FILTERS.find((f) => f.key === filter).params, ...(typeFilter ? { participant_type: typeFilter } : {}), page, per_page: 24 };
  const { data, isLoading, isFetching, error } = useGetElectionParticipants(election?.id, params);
  const { mutate: refresh, isPending: isRefreshing } = useRefreshElectionParticipants();
  const payload = data?.data;
  const rows = payload?.participants?.data ?? [];
  const lastPage = payload?.participants?.last_page ?? 1;
  const configured = Boolean(election?.participants);

  if (!configured) {
    return (
      <EmptyState
        mascot="empty"
        height="22rem"
        mascotHeight="7rem"
        title="Choose who takes part"
        description="Decide who can vote and who can apply for candidacy. You can target students by department, specialty or level, teachers, and individual administrators."
        actions={
          !locked && (
            <ConfigureTrigger election={election}>
              <EmptyStateButton icon={UsersRound}>Configure Participants</EmptyStateButton>
            </ConfigureTrigger>
          )
        }
      />
    );
  }

  const summaryLines = (group) => {
    const config = election.participants?.[group] ?? {};
    const parts = [];
    if (config.school_wide) return ["Everyone in the school"];
    const block = (list) => (Array.isArray(list) ? list[0] ?? {} : {});
    const count = (b) => ["department_ids", "specialty_ids", "level_ids", "individual_ids"].reduce((sum, k) => sum + (b?.[k]?.length ?? 0), 0);
    if (count(block(config.student_audience))) parts.push("Students");
    if (count(block(config.teacher_audience))) parts.push("Teachers");
    if (block(config.admin_audience)?.individual_ids?.length) parts.push("Administrators");
    return parts.length ? [parts.join(", ")] : ["Not configured"];
  };

  return (
    <div className="d-flex flex-column gap-3">
      <div className="d-grid gap-3" style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}>
        {["voters", "candidates"].map((group) => (
          <SectionCard
            key={group}
            title={group === "voters" ? "Who can vote" : "Who can apply"}
            description={summaryLines(group).join(" · ")}
          >
            <div className="d-flex flex-row flex-wrap gap-2">
              {Object.entries(payload?.summary ?? {}).map(([type, counts]) => (
                <StatusPill key={type} tone="neutral">
                  {PARTICIPANT_TYPES[type]?.plural ?? type} · {group === "voters" ? counts.voters : counts.applicants}
                </StatusPill>
              ))}
              {group === "candidates" && election.participants?.candidates?.must_be_voter && (
                <StatusPill tone="primary">Must also be voters</StatusPill>
              )}
            </div>
          </SectionCard>
        ))}
      </div>

      <SectionCard
        title="Eligible participants"
        description="Eligibility is resolved when participants are saved. Refresh after enrolling new students or staff."
        actions={
          !locked && (
            <>
              <button
                type="button"
                className="border rounded-3 bg-white font-size-xs px-2 py-1 d-flex flex-row align-items-center gap-1"
                onClick={() => refresh(election.id)}
                disabled={isRefreshing}
              >
                {isRefreshing ? <SingleSpinner classColor="text-primary" /> : <RefreshCw size={13} />}
                <span>Refresh</span>
              </button>
              <ConfigureTrigger election={election}>
                <button type="button" className="border-none rounded-3 primary-background text-white font-size-xs px-2 py-1">
                  Edit participants
                </button>
              </ConfigureTrigger>
            </>
          )
        }
      >
        <div className="d-flex flex-row align-items-center justify-content-between gap-2 mb-3">
          <div className="d-flex flex-row align-items-center gap-1 bg-iron-50 rounded-3 p-1">
            {FILTERS.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => {
                  setFilter(item.key);
                  setPage(1);
                }}
                className={`border-none rounded-2 font-size-xs px-2 py-1 ${filter === item.key ? "bg-white text-primary-600 fw-semibold" : "bg-transparent text-iron-500"}`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="d-flex flex-row align-items-center gap-1">
            {[["", "All types"], ...Object.entries(PARTICIPANT_TYPES).map(([key, value]) => [key, value.plural])].map(([key, label]) => (
              <button
                key={key || "all"}
                type="button"
                onClick={() => {
                  setTypeFilter(key);
                  setPage(1);
                }}
                className={`border rounded-pill font-size-xs px-2 py-1 ${typeFilter === key ? "border-primary-500 text-primary-600 bg-primary-50" : "bg-white text-iron-500"}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="teacher-card-grid">
            {[...Array(8)].map((_, index) => <RectangleSkeleton key={index} height="3.5rem" />)}
          </div>
        ) : error ? (
          <EmptyState mascot="error" height="16rem" mascotHeight="6rem" {...serverErrorCopy(error, "Unable to load participants", "Something went wrong while loading the eligible participants.")} />
        ) : rows.length === 0 ? (
          <EmptyState
            mascot="notFound"
            height="16rem"
            mascotHeight="6rem"
            title="Nobody matches these filters"
            description="Try another participant type or show everyone."
            actions={
              <EmptyStateButton variant="secondary" onClick={() => { setFilter("all"); setTypeFilter(""); setPage(1); }}>
                Clear filters
              </EmptyStateButton>
            }
          />
        ) : (
          <>
            <div className="teacher-card-grid" style={{ opacity: isFetching ? 0.6 : 1, transition: "opacity 0.15s ease" }}>
              {rows.map((row) => (
                <div key={row.id} className="teacher-card" style={{ gap: "0.5rem", padding: "0.625rem" }}>
                  <ParticipantIdentity
                    name={row.name}
                    type={row.participant_type}
                    size="2rem"
                  />
                  <div className="d-flex flex-row gap-1">
                    {row.can_vote && <StatusPill tone="success">Can vote</StatusPill>}
                    {row.can_apply && <StatusPill tone="primary">Can apply</StatusPill>}
                  </div>
                </div>
              ))}
            </div>
            {lastPage > 1 && (
              <div className="d-flex flex-row align-items-center justify-content-end gap-2 mt-3 font-size-xs text-iron-500">
                <span>Page {page} of {lastPage}</span>
                <button type="button" className="border rounded-2 bg-white p-1 d-grid" disabled={page <= 1} onClick={() => setPage((p) => p - 1)} aria-label="Previous page">
                  <ChevronLeft size={14} />
                </button>
                <button type="button" className="border rounded-2 bg-white p-1 d-grid" disabled={page >= lastPage} onClick={() => setPage((p) => p + 1)} aria-label="Next page">
                  <ChevronRight size={14} />
                </button>
              </div>
            )}
          </>
        )}
      </SectionCard>
    </div>
  );
}

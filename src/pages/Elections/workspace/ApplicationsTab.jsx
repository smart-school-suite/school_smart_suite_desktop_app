import { CircleCheck, CircleX, FileText } from "lucide-react";
import { useMemo, useState } from "react";
import { ModalButton } from "../../../components/DataTableComponents/ActionComponent";
import ParticipantIdentity from "../../../components/Election/ParticipantIdentity";
import StatusPill from "../../../components/Election/StatusPill";
import EmptyState, { EmptyStateButton } from "../../../components/errors/EmptyState";
import SearchInput from "../../../components/input/search";
import RectangleSkeleton from "../../../components/SkeletonPageLoader/RectangularSkeleton";
import { useDebounce } from "../../../hooks/common/useDebounce";
import { useGetElectionApplications } from "../../../hooks/electionApplication/useGetElectionApplications";
import ApplicationDetailsDialog from "../../../ModalContent/ElectionApplication/ApplicationDetailsDialog";
import {
  ApproveApplicationDialog,
  RejectApplicationDialog,
} from "../../../ModalContent/ElectionApplication/ApplicationDecisionDialogs";
import {
  APPLICATION_STATUS,
  formatElectionDate,
  matchesQuery,
  participantTypeLabel,
  serverErrorCopy,
} from "../../../utils/election/electionDisplay";

const REVIEWABLE = ["upcoming", "application_open", "application_closed"];
const FILTERS = ["pending", "approved", "rejected", "withdrawn"];

// Dialog triggers live inside a selectable card; keep their clicks local.
const stop = (event) => event.stopPropagation();

function ApplicationCard({ application, canReview, selected, onToggle }) {
  const pending = application.application_status === "pending";
  const selectable = canReview && pending;
  return (
    <div
      className={`teacher-card ${selectable ? "teacher-card--selectable" : ""} ${selected ? "teacher-card--selected" : ""}`}
      {...(selectable && {
        role: "button",
        tabIndex: 0,
        "aria-pressed": selected,
        onClick: () => onToggle(application),
        onKeyDown: (event) => {
          if (event.target !== event.currentTarget) return;
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onToggle(application);
          }
        },
      })}
    >
      <ParticipantIdentity
        person={application.applicant}
        name={application.applicant_name}
        type={application.applicant_type}
        subtitle={`${participantTypeLabel(application.applicant_type)} · applied ${formatElectionDate(application.created_at, "d MMM")}`}
        trailing={<StatusPill meta={APPLICATION_STATUS[application.application_status]} />}
      />
      <div className="d-flex flex-column gap-1">
        <span className="teacher-card__label">Position</span>
        <span className="fw-semibold text-truncate">{application.position?.name ?? "—"}</span>
      </div>
      <p
        className="m-0 text-iron-600 course-card__description"
        style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
        title={application.manifesto}
      >
        {application.manifesto}
      </p>
      <div className="teacher-card__footer" onClick={stop} onKeyDown={stop}>
        <div className="teacher-card__divider" />
        <div className="d-flex flex-row align-items-center justify-content-between gap-2">
          <ModalButton action={{ modalContent: ApplicationDetailsDialog }} rowData={application} size="lg">
            <button type="button" className="teacher-card__details-btn d-flex flex-row align-items-center justify-content-center gap-1 text-nowrap px-3" aria-label="Read application">
              <FileText size={13} /> Read
            </button>
          </ModalButton>
          {canReview && pending && (
            <div className="d-flex flex-row align-items-center gap-2">
              <ModalButton action={{ modalContent: RejectApplicationDialog }} rowData={application}>
                <button type="button" className="border rounded-pill bg-white px-2 py-1 font-size-xs text-red-500 d-flex flex-row align-items-center gap-1" aria-label="Reject application">
                  <CircleX size={13} /> Reject
                </button>
              </ModalButton>
              <ModalButton action={{ modalContent: ApproveApplicationDialog }} rowData={application}>
                <button type="button" className="border-none rounded-pill primary-background text-white px-2 py-1 font-size-xs d-flex flex-row align-items-center gap-1" aria-label="Approve application">
                  <CircleCheck size={13} /> Approve
                </button>
              </ModalButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ApplicationsTab({ election }) {
  const [status, setStatus] = useState("pending");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 250);
  const [selected, setSelected] = useState(() => new Set());
  const { data, isLoading, error } = useGetElectionApplications({ election_id: election?.id });
  const all = useMemo(() => (Array.isArray(data?.data) ? data.data : []), [data]);
  const canReview = REVIEWABLE.includes(election?.status);

  const counts = useMemo(
    () => Object.fromEntries(FILTERS.map((key) => [key, all.filter((a) => a.application_status === key).length])),
    [all],
  );
  const visible = useMemo(
    () =>
      all.filter(
        (application) =>
          application.application_status === status &&
          matchesQuery([application.applicant_name, application.position?.name, application.applicant_type], debouncedSearch),
      ),
    [all, status, debouncedSearch],
  );

  const selectedApplications = visible.filter((application) => selected.has(application.id));
  const toggle = (application) =>
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(application.id)) next.delete(application.id);
      else next.add(application.id);
      return next;
    });
  const selectableIds = canReview && status === "pending" ? visible.map((a) => a.id) : [];
  const allSelected = selectableIds.length > 0 && selectableIds.every((id) => selected.has(id));
  const toggleAll = () =>
    setSelected((current) => {
      const next = new Set(current);
      selectableIds.forEach((id) => (allSelected ? next.delete(id) : next.add(id)));
      return next;
    });
  const resetSelection = () => setSelected(new Set());

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="teacher-card-grid">
          {[...Array(6)].map((_, index) => <RectangleSkeleton key={index} height="14rem" />)}
        </div>
      );
    }
    if (error) {
      return <EmptyState mascot="error" height="20rem" mascotHeight="7rem" {...serverErrorCopy(error, "Unable to load applications", "Something went wrong while loading the applications.")} />;
    }
    if (all.length === 0) {
      const waiting = ["draft", "upcoming"].includes(election?.status);
      return (
        <EmptyState
          mascot={waiting ? "empty" : "sad"}
          height="20rem"
          mascotHeight="7rem"
          title={waiting ? "Applications have not opened yet" : "No applications received"}
          description={
            waiting
              ? "Eligible participants can apply once the application period opens. Their applications appear here for review."
              : "Nobody has applied for a position in this election. Check that the right people are allowed to apply."
          }
        />
      );
    }
    if (visible.length === 0) {
      return (
        <EmptyState
          mascot="notFound"
          height="20rem"
          mascotHeight="7rem"
          title={debouncedSearch ? "No matching applications" : `No ${APPLICATION_STATUS[status].label.toLowerCase()} applications`}
          description={debouncedSearch ? `No ${status} application matches "${debouncedSearch}".` : "Choose another status to see other applications."}
          actions={
            debouncedSearch && (
              <EmptyStateButton variant="secondary" onClick={() => setSearch("")}>
                Clear search
              </EmptyStateButton>
            )
          }
        />
      );
    }
    return (
      <div className="teacher-card-grid">
        {visible.map((application) => (
          <ApplicationCard
            key={application.id}
            application={application}
            canReview={canReview}
            selected={selected.has(application.id)}
            onToggle={toggle}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="d-flex flex-column gap-3">
      {!canReview && all.length > 0 && election?.status !== "draft" && (
        <div className="bg-iron-50 rounded-3 p-2 font-size-xs text-iron-600">
          Review is closed: applications can only be approved or rejected before voting starts.
        </div>
      )}
      <div className="d-flex flex-row align-items-center justify-content-between gap-2">
        <div className="d-flex flex-row align-items-center gap-1 bg-white border rounded-3 p-1" role="tablist" aria-label="Application status">
          {FILTERS.map((key) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={status === key}
              onClick={() => {
                setStatus(key);
                resetSelection();
              }}
              className={`border-none rounded-2 font-size-xs px-2 py-1 d-flex flex-row gap-1 ${status === key ? "bg-primary-50 text-primary-600 fw-semibold" : "bg-transparent text-iron-500"}`}
            >
              <span>{APPLICATION_STATUS[key].label}</span>
              <span className={status === key ? "text-primary-500" : "text-iron-400"}>{counts[key] ?? 0}</span>
            </button>
          ))}
        </div>
        <div className="d-flex flex-row align-items-center gap-2" style={{ width: "45%" }}>
          {selectableIds.length > 0 && (
            <button type="button" className="border-none bg-none color-primary font-size-xs text-nowrap" onClick={toggleAll}>
              {allSelected ? "Deselect all" : "Select all"}
            </button>
          )}
          <SearchInput
            placeholder="Search applicant or position"
            value={search}
            onChange={(value) => setSearch(value ?? "")}
            enableShortcut={false}
            disabled={all.length === 0}
          />
        </div>
      </div>

      {selectedApplications.length > 0 && (
        <div className="d-flex flex-row align-items-center justify-content-between bg-primary-50 rounded-3 px-3 py-2 font-size-sm">
          <span className="text-primary-700 fw-medium">{selectedApplications.length} selected</span>
          <div className="d-flex flex-row gap-2">
            <button type="button" className="border-none bg-none text-iron-600 font-size-xs" onClick={resetSelection}>Clear</button>
            <ModalButton action={{ modalContent: RejectApplicationDialog }} bulkData={selectedApplications} resetAll={resetSelection}>
              <button type="button" className="border rounded-3 bg-white px-2 py-1 font-size-xs text-red-500">Reject selected</button>
            </ModalButton>
            <ModalButton action={{ modalContent: ApproveApplicationDialog }} bulkData={selectedApplications} resetAll={resetSelection}>
              <button type="button" className="border-none rounded-3 primary-background text-white px-2 py-1 font-size-xs">Approve selected</button>
            </ModalButton>
          </div>
        </div>
      )}

      {renderContent()}
    </div>
  );
}

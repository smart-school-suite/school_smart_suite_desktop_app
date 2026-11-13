import { CircleX, Pencil } from "lucide-react";
import {
  formatElectionDateTime,
} from "../../utils/election/electionDisplay";

const LOCKED = ["voting_open", "voting_closed", "completed", "cancelled"];

function Row({ label, hint, children }) {
  return (
    <div className="d-flex flex-row align-items-start justify-content-between gap-3 py-2 border-bottom">
      <div className="d-flex flex-column" style={{ minWidth: 0 }}>
        <span className="font-size-sm fw-medium">{label}</span>
        {hint && <span className="text-iron-500 font-size-xs">{hint}</span>}
      </div>
      <span className="font-size-sm text-end text-iron-800 flex-shrink-0" style={{ maxWidth: "55%" }}>{children ?? "—"}</span>
    </div>
  );
}

/**
 * Election settings at a glance. rowData: an election. `onEdit` (optional)
 * opens the edit drawer; shown while the election can still be edited.
 */
export default function ElectionSettingsDialog({ rowData: election, handleClose, onEdit }) {
  const editable = onEdit && !LOCKED.includes(election?.status);
  return (
    <div className="w-100 d-flex flex-column">
      <div className="border-bottom rounded-top-4 px-3 py-2 d-flex flex-row align-items-center justify-content-between bg-iron-50">
        <div className="d-flex flex-column" style={{ minWidth: 0 }}>
          <span className="font-size-sm fw-semibold">Election settings</span>
          <span className="text-iron-500 font-size-xs text-truncate">{election?.title ?? election?.election_type?.election_title}</span>
        </div>
        <button
          type="button"
          onClick={() => handleClose?.()}
          className="border-none border rounded-circle bg-transparent p-0 d-grid flex-shrink-0"
          style={{ width: "2rem", height: "2rem", placeItems: "center" }}
          aria-label="Close"
        >
          <CircleX size={16} />
        </button>
      </div>
      <div className="px-3 pt-1 pb-2 d-flex flex-column">
        <Row label="Election type">{election?.election_type?.election_title}</Row>
        <Row label="Academic year" hint="Office terms begin in this academic year.">{election?.system_academic_year?.name}</Row>
        <Row label="Positions per applicant" hint="How many positions one person may apply for.">{election?.max_applications_per_participant ?? 1}</Row>
        <Row label="Self-votes" hint="Whether candidates may vote for themselves.">{election?.allow_candidate_self_vote ? "Allowed" : "Not allowed"}</Row>
        <Row label="Results">{election?.results_published_at ? `Published ${formatElectionDateTime(election.results_published_at)}` : "Not published"}</Row>
        {election?.description && (
          <div className="d-flex flex-column gap-1 py-2">
            <span className="font-size-sm fw-medium">Description</span>
            <p className="m-0 text-iron-600 font-size-sm" style={{ lineHeight: 1.6 }}>{election.description}</p>
          </div>
        )}
      </div>
      <div className="border-top px-3 py-2 d-flex flex-row align-items-center justify-content-between gap-2">
        <span className="text-iron-500 font-size-xs">
          {editable ? "Settings can change until voting starts." : "Settings are locked once voting starts."}
        </span>
        <div className="d-flex flex-row gap-2">
          <button type="button" className="border px-3 py-2 rounded-3 font-size-sm bg-white" onClick={() => handleClose?.()}>
            Close
          </button>
          {editable && (
            <button type="button" className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white d-flex flex-row align-items-center gap-1" onClick={onEdit}>
              <Pencil size={13} /> Edit settings
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

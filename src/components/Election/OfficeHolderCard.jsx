import { differenceInCalendarDays, parseISO } from "date-fns";
import { motion, useReducedMotion } from "framer-motion";
import { History, Repeat2, UserX } from "lucide-react";
import ReplaceOfficeHolder from "../../DrawerContent/ElectionOffice/ReplaceOfficeHolder";
import ParticipantHistoryDialog from "../../ModalContent/ElectionOffice/ParticipantHistoryDialog";
import TerminateOfficeHolder from "../../ModalContent/ElectionOffice/TerminateOfficeHolder";
import {
  APPOINTMENT_TYPE,
  OFFICE_HOLDER_STATUS,
  formatElectionDate,
} from "../../utils/election/electionDisplay";
import ChipRow from "../Card/ChipRow";
import { ModalButton } from "../DataTableComponents/ActionComponent";
import DrawerTrigger from "../drawer/DrawerTrigger";
import ParticipantIdentity from "./ParticipantIdentity";
import StatusPill from "./StatusPill";

const tenureProgress = (holder) => {
  if (!holder?.started_at || !holder?.expected_end_at) return 0;
  const start = parseISO(holder.started_at);
  const end = parseISO(holder.ended_at ?? holder.expected_end_at);
  const total = Math.max(1, differenceInCalendarDays(end, start));
  const elapsed = differenceInCalendarDays(new Date(), start);
  return Math.max(0, Math.min(100, (elapsed / total) * 100));
};

/**
 * Fixed-size office holder summary with tenure progress and actions.
 *
 *   <OfficeHolderCard holder={holder} />              // actions shown while in office
 *   <OfficeHolderCard holder={holder} readOnly />
 */
export default function OfficeHolderCard({ holder, readOnly = false }) {
  const reduceMotion = useReducedMotion();
  const occupying = ["scheduled", "active"].includes(holder?.status);
  const progress = tenureProgress(holder);
  const years = (holder?.tenure_years ?? []).map((year) => year.system_academic_year?.name).filter(Boolean);
  const historyData = { type: holder?.holder_type, id: holder?.holder_id, name: holder?.name, person: holder?.holder };

  return (
    <div className="teacher-card">
      <ParticipantIdentity
        person={holder?.holder}
        name={holder?.name}
        type={holder?.holder_type}
        trailing={<StatusPill meta={OFFICE_HOLDER_STATUS[holder?.status]} />}
      />
      <div className="d-flex flex-row align-items-center justify-content-between gap-2">
        <div className="d-flex flex-column" style={{ minWidth: 0 }}>
          <span className="teacher-card__label">Position</span>
          <span className="fw-semibold text-truncate">{holder?.position?.name ?? "—"}</span>
        </div>
        <StatusPill meta={APPOINTMENT_TYPE[holder?.appointment_type]} />
      </div>
      <div className="d-flex flex-column gap-1">
        <div className="d-flex flex-row justify-content-between font-size-xs text-iron-500">
          <span>{formatElectionDate(holder?.started_at)}</span>
          <span>{formatElectionDate(holder?.ended_at ?? holder?.expected_end_at)}</span>
        </div>
        <div className="rounded-pill overflow-hidden bg-iron-100" style={{ height: 5 }}>
          <motion.div
            className={`h-100 rounded-pill ${holder?.status === "terminated" ? "bg-red-300" : "bg-primary-500"}`}
            initial={{ width: 0 }}
            animate={{ width: `${holder?.status === "completed" ? 100 : progress}%` }}
            transition={{ duration: reduceMotion ? 0 : 0.6 }}
          />
        </div>
      </div>
      <div className="d-flex flex-column gap-1">
        <span className="teacher-card__label">Academic years</span>
        <ChipRow items={years} variant="neutral" label="academic years" />
      </div>
      <div className="teacher-card__footer">
        <div className="teacher-card__divider" />
        <div className="d-flex flex-row align-items-center gap-2">
          <ModalButton action={{ modalContent: ParticipantHistoryDialog }} rowData={historyData} size="md" classname="flex-grow-1">
            <button type="button" className="teacher-card__details-btn d-flex flex-row align-items-center justify-content-center gap-1">
              <History size={13} /> History
            </button>
          </ModalButton>
          {!readOnly && occupying && (
            <>
              <DrawerTrigger title="Replace Office Holder" drawerChildren={ReplaceOfficeHolder} drawerData={{ holder }}>
                <span className="teacher-card__details-btn d-flex flex-row align-items-center justify-content-center gap-1 px-2" title="Replace">
                  <Repeat2 size={13} /> Replace
                </span>
              </DrawerTrigger>
              <ModalButton action={{ modalContent: TerminateOfficeHolder }} rowData={holder}>
                <span className="teacher-card__details-btn d-flex flex-row align-items-center justify-content-center px-2 text-red-500" title="End tenure" aria-label="End tenure">
                  <UserX size={13} />
                </span>
              </ModalButton>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

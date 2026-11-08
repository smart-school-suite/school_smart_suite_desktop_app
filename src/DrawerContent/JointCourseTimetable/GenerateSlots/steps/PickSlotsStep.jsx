import { Icon } from "@iconify/react";
import { ArrowLeft, ArrowRight, RefreshCw } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import {
  EmptyState,
  TextButton,
  WizardFooter,
  WizardStep,
} from "../../../../components/SemesterTimetable/ConstraintWizard/WizardPrimitives";
import {
  MAX_PICKS,
  blockedReason,
  chooseHall,
  picksWithoutHall,
  timeKey,
  toggleTime,
} from "../../../../utils/jointCourseTimetable/slotPicks";
import { formatTime } from "../../../../utils/semesterTimetable/timeUtils";
import CustomModal from "../../../../components/Modals/Modal";
import SelectHall from "../../../../ModalContent/JointCourseTimetable/SelectHall";
import SlotCard from "../components/SlotCard";

/** Minutes until the proposal expires, refreshed every 15 seconds. */
const useMinutesLeft = (expiresAt) => {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 15_000);
    return () => clearInterval(timer);
  }, []);
  return expiresAt ? Math.max(0, Math.ceil((new Date(expiresAt).getTime() - now) / 60_000)) : null;
};

function PickSlotsStep({ nextStep, previousStep, drawerData }) {
  const { course, proposal, picks, setPicks, generate, runGenerate } = drawerData;
  const days = proposal?.days ?? [];
  const [activeDay, setActiveDay] = useState(days.find((day) => day.times.length)?.day ?? days[0]?.day);
  const minutesLeft = useMinutesLeft(proposal?.expires_at);
  const expired = minutesLeft === 0;
  const day = days.find((item) => item.day === activeDay) ?? days[0];
  // The selected period whose hall is being chosen: { day, time, pick }.
  const [hallTarget, setHallTarget] = useState(null);
  const closeHallPicker = useCallback(() => setHallTarget(null), []);

  if (!proposal) {
    return (
      <WizardStep footer={<WizardFooter onBack={previousStep} />}>
        <EmptyState title="No slots yet" text="Go back, choose the days and duration, and find free slots." />
      </WizardStep>
    );
  }

  const picksOn = (dayKey) => picks.filter((pick) => pick.day === dayKey).length;
  const missingHall = picksWithoutHall(picks).length;
  const studentCount = proposal.students?.total ?? null;

  const assigned = picks.length - missingHall;
  const ready = picks.length > 0 && missingHall === 0 && !expired;
  const maxPicks = proposal.max_selections ?? MAX_PICKS;

  return (
    <div className="d-flex flex-column flex-grow-1" style={{ minHeight: 0 }}>
      <WizardStep
        title="Pick available slots"
        description="Select the available teaching periods you want to use, then assign a hall to each. Periods on the same day can't overlap."
        footer={
          <div className="d-flex flex-row align-items-center justify-content-between gap-3 w-100 px-2 py-2 font-size-sm">
            <div className="d-flex flex-row align-items-center gap-3" style={{ minWidth: 0 }}>
              <button type="button" className="cw-btn cw-btn--ghost" onClick={previousStep}>
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>
              <div className="d-flex flex-column" style={{ minWidth: 0 }}>
                <span className="fw-semibold">
                  {picks.length} slot{picks.length === 1 ? "" : "s"} selected
                </span>
                <span className={`font-size-xs text-truncate ${expired ? "text-old-lace-700" : ready ? "text-fern-700" : "text-iron-500"}`}>
                  {expired
                    ? "These slots expired. Find them again."
                    : picks.length === 0
                      ? "Select at least one period"
                      : missingHall
                        ? `${assigned} of ${picks.length} halls assigned · ${missingHall} pending`
                        : `${assigned} hall${assigned === 1 ? "" : "s"} assigned · Ready for review`}
                </span>
              </div>
            </div>
            <div className="d-flex flex-row align-items-center gap-2 flex-shrink-0">
              {ready && (
                <span className="rounded-pill px-2 font-size-xs fw-medium bg-fern-50 text-fern-700">Ready</span>
              )}
              <button
                type="button"
                className="cw-btn cw-btn--primary"
                onClick={nextStep}
                disabled={!ready}
              >
                <span>Review selection</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        }
      >
        <div className="d-flex flex-row flex-wrap align-items-center gap-2 mb-3 font-size-xs">
          <Chip>{formatTime(proposal.window?.start_time)} – {formatTime(proposal.window?.end_time)}</Chip>
          {studentCount !== null && (
            <Chip title={(proposal.students?.by_specialty ?? []).map((item) => `${item.label}: ${item.student_count}`).join("\n")}>
              {studentCount} student{studentCount === 1 ? "" : "s"}
            </Chip>
          )}
          <Chip tone={picks.length ? (missingHall ? "selected" : "ready") : "muted"}>
            {picks.length} of {maxPicks} selected
          </Chip>
          <Chip title="From App Configuration · Timetable Settings">
            Teacher preferences {proposal.teacher_preference}
          </Chip>
          {minutesLeft !== null && (
            <Chip tone={expired || minutesLeft <= 5 ? "warn" : "muted"}>
              {expired ? "Expired" : `Expires in ${minutesLeft} min`}
            </Chip>
          )}
        </div>

        {expired && (
          <div className="jcs-alert jcs-alert--warn mb-3" role="alert">
            <Icon icon="lucide:timer-off" width={18} height={18} className="jcs-alert__icon" />
            <div className="d-flex flex-column gap-1">
              <span className="fw-semibold">These slots have expired</span>
              <span>Free times can change, so find them again before saving. Your picks will be cleared.</span>
              <TextButton icon="lucide:refresh-cw" onClick={() => runGenerate()}>
                {generate.isPending ? "Finding free slots…" : "Find free slots again"}
              </TextButton>
            </div>
          </div>
        )}

        <div className="cw-tabs" role="tablist">
          {days.map((tab) => (
            <button
              key={tab.day}
              type="button"
              role="tab"
              aria-selected={tab.day === day?.day}
              className={`cw-tab ${tab.day === day?.day ? "is-active" : ""}`}
              onClick={() => setActiveDay(tab.day)}
            >
              {tab.day_label}
              <span className="cw-tab__count" title={`${picksOn(tab.day)} picked`}>{picksOn(tab.day)}</span>
            </button>
          ))}
        </div>

        {day && (
          <div className="d-flex flex-column gap-2 mt-3">
            <div className="d-flex flex-row align-items-baseline justify-content-between gap-2">
              <div className="d-flex flex-row align-items-baseline gap-2">
                <span className="fw-semibold font-size-md">{day.day_label}</span>
                <span className="font-size-xs text-iron-500">
                  {day.times.length} available period{day.times.length === 1 ? "" : "s"}
                  {day.period_duration?.name ? ` · ${day.period_duration.name}` : ""}
                </span>
              </div>
              {!expired && (
                <button
                  type="button"
                  className="d-inline-flex align-items-center gap-1 border-0 bg-transparent font-size-xs text-iron-600 hover-text-primary"
                  onClick={() => runGenerate()}
                >
                  <RefreshCw size={12} /> {generate.isPending ? "Finding…" : "Find again"}
                </button>
              )}
            </div>
            {day.message && <span className="font-size-xs text-iron-500">{day.message}</span>}

            {day.times.length === 0 ? (
              <EmptyState icon="lucide:calendar-x-2" title={`No free time on ${day.day_label}`} text={day.message} />
            ) : (
              day.times.map((time) => {
                const key = timeKey(day.day, time.start_time);
                const pick = picks.find((item) => item.key === key);
                return (
                  <SlotCard
                    key={key}
                    course={course}
                    teacher={proposal.teacher}
                    day={day}
                    time={time}
                    pick={pick}
                    blocked={blockedReason(picks, day.day, time)}
                    disabled={expired}
                    studentCount={studentCount}
                    onToggle={() => setPicks(toggleTime(picks, day, time))}
                    onSelectHall={() => setHallTarget({ day, time, pick })}
                  />
                );
              })
            )}
          </div>
        )}
      </WizardStep>

      {/* Escape is handled inside SelectHall so it doesn't also close the
          drawer; enforceFocus off so the modal doesn't fight the drawer's
          focus trap. */}
      <CustomModal
        show={Boolean(hallTarget)}
        handleClose={closeHallPicker}
        closeOnEscape={false}
        enforceFocus={false}
        centered
      >
        {hallTarget && (
          <SelectHall
            rowData={{ ...hallTarget, course, studentCount }}
            handleClose={closeHallPicker}
            onConfirm={(hall) => {
              setPicks(chooseHall(picks, hallTarget.pick.key, hall));
              setHallTarget(null);
            }}
          />
        )}
      </CustomModal>
    </div>
  );
}

const CHIP = {
  muted: "bg-iron-100 text-iron-700",
  selected: "bg-primary-50 text-primary-700",
  ready: "bg-fern-50 text-fern-700",
  warn: "bg-old-lace-50 text-old-lace-700",
};

function Chip({ tone = "muted", title, children }) {
  return (
    <span className={`rounded-pill px-2 py-1 fw-medium text-nowrap ${CHIP[tone]}`} title={title || undefined}>
      {children}
    </span>
  );
}

export default PickSlotsStep;

import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import {
  EmptyState,
  Section,
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

  return (
    <WizardStep
      title="Pick the slots you want"
      description="Every slot below is a time the lecturer is free. Select the slots you want, then choose a hall for each; slots on the same day can't overlap."
      footer={
        <WizardFooter
          onBack={previousStep}
          onNext={nextStep}
          nextLabel={picks.length ? `Review ${picks.length} slot${picks.length === 1 ? "" : "s"}` : "Review"}
          nextDisabled={picks.length === 0 || missingHall > 0 || expired}
          hint={
            expired
              ? "These slots expired"
              : missingHall
                ? `Choose a hall for ${missingHall} slot${missingHall === 1 ? "" : "s"}`
                : "Select at least one slot"
          }
        />
      }
    >
      <div className="jcs-context">
        <span className="jcs-context__item">
          <Icon icon="lucide:user-round" width={14} height={14} />
          {proposal.teacher?.name}
        </span>
        <span className="jcs-context__item" title="From App Configuration · Timetable Settings">
          <Icon icon="lucide:sliders-horizontal" width={14} height={14} />
          Teacher preferences {proposal.teacher_preference}
        </span>
        <span className="jcs-context__item">
          <Icon icon="lucide:clock" width={14} height={14} />
          {formatTime(proposal.window?.start_time)} – {formatTime(proposal.window?.end_time)}
        </span>
        <span className="jcs-context__item">
          <Icon icon="lucide:circle-check" width={14} height={14} />
          {picks.length} of {proposal.max_selections ?? MAX_PICKS} selected
        </span>
        {studentCount !== null && (
          <span className="jcs-context__item" title={(proposal.students?.by_specialty ?? []).map((item) => `${item.label}: ${item.student_count}`).join("\n")}>
            <Icon icon="lucide:users" width={14} height={14} />
            {studentCount} student{studentCount === 1 ? "" : "s"}
          </span>
        )}
        {minutesLeft !== null && (
          <span className={`jcs-context__item ${minutesLeft <= 5 ? "jcs-context__item--warn" : ""}`}>
            <Icon icon="lucide:timer" width={14} height={14} />
            {expired ? "Expired" : `Expires in ${minutesLeft} min`}
          </span>
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
            {/* Picked on this day; the free-time count is in the section header. */}
            <span className="cw-tab__count" title={`${picksOn(tab.day)} picked`}>{picksOn(tab.day)}</span>
          </button>
        ))}
      </div>

      {day && (
        <Section
          label={`${day.day_label} · ${day.period_duration?.name ?? `${day.duration_minutes} min`}`}
          hint={day.message}
          action={
            !expired && (
              <TextButton icon="lucide:refresh-cw" tone="muted" onClick={() => runGenerate()}>
                {generate.isPending ? "Finding…" : "Find again"}
              </TextButton>
            )
          }
        >
          {day.times.length === 0 ? (
            <EmptyState icon="lucide:calendar-x-2" title={`No free time on ${day.day_label}`} text={day.message} />
          ) : (
            <div className="row g-2">
              {day.times.map((time) => {
                const key = timeKey(day.day, time.start_time);
                return (
                  <div key={key} className="col-12 col-xl-6">
                    <SlotCard
                      course={course}
                      teacher={proposal.teacher}
                      time={time}
                      pick={picks.find((pick) => pick.key === key)}
                      blocked={blockedReason(picks, day.day, time)}
                      disabled={expired}
                      studentCount={studentCount}
                      onToggle={() => setPicks(toggleTime(picks, day, time))}
                      onChooseHall={(hall) => setPicks(chooseHall(picks, key, hall))}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </Section>
      )}
    </WizardStep>
  );
}

export default PickSlotsStep;

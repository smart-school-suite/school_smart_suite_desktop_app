import { Icon } from "@iconify/react";
import { useEffect, useMemo, useState } from "react";
import {
  EmptyState,
  Section,
  TextButton,
  TimeSpan,
  WizardFooter,
  WizardStep,
} from "../../../../components/SemesterTimetable/ConstraintWizard/WizardPrimitives";
import {
  MAX_PICKS,
  blockedReason,
  optionsById,
  togglePick,
} from "../../../../utils/jointCourseTimetable/slotPicks";
import { formatTime } from "../../../../utils/semesterTimetable/timeUtils";

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
  const { proposal, picks, setPicks, generate, runGenerate } = drawerData;
  const days = proposal?.days ?? [];
  const [activeDay, setActiveDay] = useState(days.find((day) => day.times.length)?.day ?? days[0]?.day);
  const options = useMemo(() => optionsById(proposal), [proposal]);
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

  return (
    <WizardStep
      title="Pick the slots you want"
      description="Every time below is free for the lecturer, with the halls free at that time. Pick a hall at each time you want to teach; picks on the same day can't overlap."
      footer={
        <WizardFooter
          onBack={previousStep}
          onNext={nextStep}
          nextLabel={picks.length ? `Review ${picks.length} slot${picks.length === 1 ? "" : "s"}` : "Review"}
          nextDisabled={picks.length === 0 || expired}
          hint={expired ? "These slots expired" : "Pick at least one slot"}
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
          {picks.length} of {proposal.max_selections ?? MAX_PICKS} picked
        </span>
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
            <ul className="jcs-summaries">
              {day.times.map((time) => {
                const blocked = blockedReason(picks, day.day, time);
                return (
                  <li key={time.start_time} className="jcs-summary">
                    <div
                      className={`d-flex flex-row flex-wrap align-items-center gap-2 ${blocked ? "opacity-50" : ""}`}
                      title={blocked ?? undefined}
                    >
                      <span style={{ minWidth: "10rem" }}>
                        <TimeSpan start={time.start_time} end={time.end_time} />
                      </span>
                      {time.halls.map((hall) => {
                        const picked = picks.some((pick) => pick.option_id === hall.option_id);
                        return (
                          <button
                            key={hall.option_id}
                            type="button"
                            disabled={Boolean(blocked) || expired}
                            aria-pressed={picked}
                            onClick={() => setPicks(togglePick(picks, options[hall.option_id]))}
                            className={`rounded-pill px-3 py-1 font-size-sm d-flex flex-row align-items-center gap-1 ${
                              picked ? "primary-background text-white border border-0" : "bg-white border"
                            }`}
                            title={hall.capacity ? `${hall.name} · ${hall.capacity} seats` : hall.name}
                          >
                            {picked && <Icon icon="lucide:check" width={13} height={13} />}
                            <span>{hall.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </Section>
      )}
    </WizardStep>
  );
}

export default PickSlotsStep;

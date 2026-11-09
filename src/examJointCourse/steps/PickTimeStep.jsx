import { Icon } from "@iconify/react";
import { Circle, CircleCheck } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Badge,
  EmptyState,
  Note,
  Section,
  TextButton,
  TimeSpan,
  WizardFooter,
  WizardStep,
} from "../../components/SemesterTimetable/ConstraintWizard/WizardPrimitives";
import { formatExamDate } from "../../examTimetable/constraints/fields";
import { formatTime } from "../../utils/semesterTimetable/timeUtils";

/** Minutes until the proposal expires, refreshed every 15 seconds. */
const useMinutesLeft = (expiresAt) => {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 15_000);
    return () => clearInterval(timer);
  }, []);
  return expiresAt ? Math.max(0, Math.ceil((new Date(expiresAt).getTime() - now) / 60_000)) : null;
};

const sameDay = (time) =>
  time.other_exams_that_day === 0
    ? "No other exam that day"
    : `${time.other_exams_that_day} other exam${time.other_exams_that_day === 1 ? "" : "s"} that day${
        time.min_break_minutes != null ? ` · ${time.min_break_minutes} min break` : ""
      }`;

/** One free time, laid out like the semester joint course slot card. Only one can be chosen. */
function ExamTimeCard({ course, time, selected, recommended, disabled, onSelect }) {
  const choose = () => !disabled && onSelect();
  return (
    <div
      role="radio"
      aria-checked={selected}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onClick={choose}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          choose();
        }
      }}
      className={`card rounded-3 p-3 w-100 h-100 d-flex flex-column gap-2 ${
        selected ? "border-1 border-solid border-primary-500 bg-primary-50" : "border-1 border-solid border-iron-200 bg-white"
      } ${disabled ? "opacity-50" : "pointer-cursor"}`}
    >
      <div className="d-flex flex-row align-items-start justify-content-between gap-2">
        <span className="cw-option__title">
          <TimeSpan start={time.start_time} end={time.end_time} />
        </span>
        <span className="d-flex flex-row align-items-center gap-2 flex-shrink-0">
          {recommended && <Badge tone="success">Recommended</Badge>}
          {selected ? (
            <CircleCheck size={20} className="text-primary-500" aria-hidden="true" />
          ) : (
            <Circle size={20} strokeWidth={1.5} className="text-iron-400" aria-hidden="true" />
          )}
        </span>
      </div>

      <div className="d-flex flex-column">
        <span className="fw-semibold text-truncate">{course.course?.title}</span>
        <span className="cw-option__meta">{[formatExamDate(time.date, "EEEE d MMMM"), course.course?.code].filter(Boolean).join(" · ")}</span>
      </div>

      <div className="d-flex flex-row flex-wrap align-items-center gap-3 mt-1 font-size-sm">
        <span className="d-flex flex-row align-items-center gap-1" title={`${time.halls_needed ?? "?"} hall(s) needed`}>
          <Icon icon="lucide:door-open" width={14} height={14} />
          {time.seats_free} seats free for {time.seats_needed}
        </span>
        <span className="d-flex flex-row align-items-center gap-1">
          <Icon icon="lucide:user-round-check" width={14} height={14} />
          {time.invigilators_free} of {time.invigilators_needed} invigilators free
        </span>
      </div>
      <span className="jcs-field-hint">{sameDay(time)}</span>
    </div>
  );
}

function PickTimeStep({ nextStep, previousStep, drawerData }) {
  const { course, form, proposal, pick, setPick, generate, runGenerate } = drawerData;
  const dates = proposal?.dates ?? [];
  const [activeDate, setActiveDate] = useState(pick?.date ?? dates.find((date) => date.times.length)?.date ?? dates[0]?.date);
  const minutesLeft = useMinutesLeft(proposal?.expires_at);
  const expired = minutesLeft === 0;
  const date = dates.find((item) => item.date === activeDate) ?? dates[0];
  const missing = proposal?.specialties_without_exam ?? [];

  if (!proposal) {
    return (
      <WizardStep footer={<WizardFooter onBack={previousStep} />}>
        <EmptyState title="No times yet" text="Go back, choose the dates, length and hours, and find free times." />
      </WizardStep>
    );
  }

  const candidates = proposal.candidates?.total ?? 0;

  return (
    <WizardStep
      title="Pick the time of the joint exam"
      description="A joint exam takes place once, at the same time for every linked specialty. Every time below is free for all their students, with enough hall seats and invigilators."
      footer={
        <WizardFooter
          onBack={previousStep}
          onNext={nextStep}
          nextLabel="Review"
          nextDisabled={!pick || expired}
          hint={expired ? "These times expired" : "Pick a time"}
        />
      }
    >
      <div className="jcs-context">
        <span
          className="jcs-context__item"
          title={(proposal.candidates?.by_exam ?? []).map((item) => `${item.specialty}: ${item.candidate_count}`).join("\n")}
        >
          <Icon icon="lucide:users" width={14} height={14} />
          {candidates} candidate{candidates === 1 ? "" : "s"}
        </span>
        <span className="jcs-context__item">
          <Icon icon="lucide:hourglass" width={14} height={14} />
          {proposal.duration_minutes} min
        </span>
        <span className="jcs-context__item">
          <Icon icon="lucide:clock" width={14} height={14} />
          {formatTime(form.start_time)} – {formatTime(form.end_time)}
        </span>
        <span className="jcs-context__item">
          <Icon icon="lucide:circle-check" width={14} height={14} />
          {pick ? "1 of 1 selected" : "None selected"}
        </span>
        {minutesLeft !== null && (
          <span className={`jcs-context__item ${minutesLeft <= 5 ? "jcs-context__item--warn" : ""}`}>
            <Icon icon="lucide:timer" width={14} height={14} />
            {expired ? "Expired" : `Expires in ${minutesLeft} min`}
          </span>
        )}
      </div>

      {missing.length > 0 && (
        <div className="mb-3">
          <Note>
            Only the linked specialties' students were checked. {missing.map((item) => item.label).join(", ")}{" "}
            {missing.length === 1 ? "has" : "have"} no {course.exam_type?.name ?? "exam"} yet; find the times again once{" "}
            {missing.length === 1 ? "its" : "their"} exam is created.
          </Note>
        </div>
      )}

      {expired && (
        <div className="jcs-alert jcs-alert--warn mb-3" role="alert">
          <Icon icon="lucide:timer-off" width={18} height={18} className="jcs-alert__icon" />
          <div className="d-flex flex-column gap-1">
            <span className="fw-semibold">These times have expired</span>
            <span>Free times can change, so find them again before saving. Your pick will be cleared.</span>
            <TextButton icon="lucide:refresh-cw" onClick={() => runGenerate()}>
              {generate.isPending ? "Finding free times…" : "Find free times again"}
            </TextButton>
          </div>
        </div>
      )}

      {dates.length === 0 ? (
        <EmptyState icon="lucide:calendar-x-2" title="No shared exam dates" text={proposal.summary?.message} />
      ) : (
        <>
          <div className="cw-tabs" role="tablist">
            {dates.map((tab) => (
              <button
                key={tab.date}
                type="button"
                role="tab"
                aria-selected={tab.date === date?.date}
                className={`cw-tab ${tab.date === date?.date ? "is-active" : ""}`}
                onClick={() => setActiveDate(tab.date)}
              >
                {formatExamDate(tab.date, "EEE d MMM")}
                <span className="cw-tab__count" title={`${tab.times.length} free time(s)`}>
                  {tab.times.length}
                </span>
              </button>
            ))}
          </div>

          {date && (
            <Section
              label={tab(date)}
              hint={date.message}
              action={
                !expired && (
                  <TextButton icon="lucide:refresh-cw" tone="muted" onClick={() => runGenerate()}>
                    {generate.isPending ? "Finding…" : "Find again"}
                  </TextButton>
                )
              }
            >
              {date.times.length === 0 ? (
                <EmptyState icon="lucide:calendar-x-2" title={`No free time on ${formatExamDate(date.date)}`} text={date.message} />
              ) : (
                <div className="row g-2">
                  {date.times.map((time) => (
                    <div key={time.option_id} className="col-12 col-xl-6">
                      <ExamTimeCard
                        course={course}
                        time={time}
                        selected={pick?.option_id === time.option_id}
                        recommended={proposal.recommended_option_id === time.option_id}
                        disabled={expired}
                        onSelect={() => setPick(time)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </Section>
          )}
        </>
      )}
    </WizardStep>
  );
}

const tab = (date) =>
  `${formatExamDate(date.date, "EEEE d MMMM")}${date.other_exams_that_day ? ` · ${date.other_exams_that_day} other exam(s)` : ""}`;

export default PickTimeStep;

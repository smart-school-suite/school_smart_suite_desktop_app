import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { EmptyState, Section, TextButton, WizardFooter, WizardStep } from "../../components/SemesterTimetable/ConstraintWizard/WizardPrimitives";

const useMinutesLeft = (expiresAt) => {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 15_000);
    return () => clearInterval(timer);
  }, []);
  return expiresAt ? Math.max(0, Math.ceil((new Date(expiresAt).getTime() - now) / 60_000)) : null;
};

/** One free time: when, and how many seats and invigilators are free then. */
function TimeCard({ time, selected, recommended, disabled, onSelect }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onSelect}
      aria-pressed={selected}
      className={`w-100 text-start rounded-3 p-2 d-flex flex-column gap-1 font-size-sm ${selected ? "bg-primary-50" : "bg-white"}`}
      style={{ border: `1px solid var(${selected ? "--primary-color-400" : "--iron-200"})` }}
    >
      <div className="d-flex flex-row align-items-center justify-content-between gap-2">
        <span className="fw-semibold tabular-nums">{time.time}</span>
        <span className="d-flex flex-row gap-1">
          {recommended && <span className="rounded-pill px-2 font-size-xs bg-fern-50 text-fern-700">Recommended</span>}
          {selected && <Icon icon="lucide:circle-check" width={16} height={16} className="color-primary" />}
        </span>
      </div>
      <span className="font-size-xs text-iron-500 d-flex flex-row flex-wrap gap-2">
        <span>
          <Icon icon="streamline-flex:city-hall" width={12} height={12} /> {time.seats_free} seats free for {time.seats_needed}
        </span>
        <span>
          <Icon icon="lucide:user-round-check" width={12} height={12} /> {time.invigilators_free} invigilators free
        </span>
        <span>
          {time.other_exams_that_day === 0
            ? "No other exam that day"
            : `${time.other_exams_that_day} other exam(s) that day${time.min_break_minutes != null ? `, ${time.min_break_minutes} min break` : ""}`}
        </span>
      </span>
    </button>
  );
}

function PickTimeStep({ nextStep, previousStep, drawerData }) {
  const { proposal, pick, setPick, generate, runGenerate } = drawerData;
  const dates = proposal?.dates ?? [];
  const [activeDate, setActiveDate] = useState(pick?.date ?? dates.find((date) => date.times.length)?.date ?? dates[0]?.date);
  const minutesLeft = useMinutesLeft(proposal?.expires_at);
  const expired = minutesLeft === 0;
  const date = dates.find((item) => item.date === activeDate) ?? dates[0];

  if (!proposal) {
    return (
      <WizardStep footer={<WizardFooter onBack={previousStep} />}>
        <EmptyState title="No times yet" text="Go back, choose the exam length and find free times." />
      </WizardStep>
    );
  }

  return (
    <WizardStep
      title="Pick the time of the joint exam"
      description="A joint exam takes place once. Every time below works for all the linked specialties."
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
        <span className="jcs-context__item">
          <Icon icon="lucide:users" width={14} height={14} />
          {proposal.candidates?.total ?? 0} candidates
        </span>
        <span className="jcs-context__item">
          <Icon icon="lucide:clock" width={14} height={14} />
          {proposal.duration_minutes} min
        </span>
        {minutesLeft !== null && (
          <span className={`jcs-context__item ${minutesLeft <= 5 ? "jcs-context__item--warn" : ""}`}>
            <Icon icon="lucide:timer" width={14} height={14} />
            {expired ? "Expired" : `Expires in ${minutesLeft} min`}
          </span>
        )}
      </div>

      {(proposal.specialties_without_exam ?? []).length > 0 && (
        <div className="jcs-alert jcs-alert--warn mb-2" role="alert">
          <Icon icon="lucide:triangle-alert" width={18} height={18} className="jcs-alert__icon" />
          <span>
            {proposal.specialties_without_exam.map((item) => item.label).join(", ")} take this course but have no exam yet, so their students are not checked.
          </span>
        </div>
      )}

      {expired && (
        <div className="jcs-alert jcs-alert--warn mb-3" role="alert">
          <Icon icon="lucide:timer-off" width={18} height={18} className="jcs-alert__icon" />
          <div className="d-flex flex-column gap-1">
            <span className="fw-semibold">These times have expired</span>
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
                {tab.date_label}
                <span className="cw-tab__count" title={`${tab.times.length} free time(s)`}>{tab.times.length}</span>
              </button>
            ))}
          </div>
          {date && (
            <Section label={date.date_label} hint={date.message}>
              {date.times.length === 0 ? (
                <EmptyState icon="lucide:calendar-x-2" title="No free time" text={date.message} />
              ) : (
                <div className="row g-2">
                  {date.times.map((time) => (
                    <div key={time.option_id} className="col-12 col-xl-6">
                      <TimeCard
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

export default PickTimeStep;

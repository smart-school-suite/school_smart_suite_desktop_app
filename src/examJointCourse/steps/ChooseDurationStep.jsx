import { Note, OptionTile, Section, WizardFooter, WizardStep } from "../../components/SemesterTimetable/ConstraintWizard/WizardPrimitives";
import { TimeInput } from "../../examTimetable/constraints/fields";
import { isRange } from "../../utils/examTimetable/buildRequest";

const DURATIONS = [60, 90, 120, 150, 180, 240];
const label = (minutes) => [Math.floor(minutes / 60) ? `${Math.floor(minutes / 60)} h` : null, minutes % 60 ? `${minutes % 60} min` : null].filter(Boolean).join(" ");

function ChooseDurationStep({ nextStep, drawerData }) {
  const { form, updateForm, generate, runGenerate } = drawerData;
  const valid = Number(form.duration) > 0 && isRange(form.start_time, form.end_time);
  const error = generate.error?.response?.data?.errors;

  return (
    <WizardStep
      title="How long is the exam?"
      description="Times are searched inside every linked specialty's exam period, when all their students are free and enough halls and invigilators are."
      footer={
        <WizardFooter
          onNext={() => runGenerate(nextStep)}
          nextLabel={generate.isPending ? "Finding free times…" : "Find free times"}
          nextDisabled={!valid || generate.isPending}
          nextIcon="lucide:sparkles"
          hint="Choose a length and valid exam hours"
        />
      }
    >
      <Section label="Exam length">
        <div className="row g-2">
          {DURATIONS.map((minutes) => (
            <div key={minutes} className="col-4">
              <OptionTile selected={Number(form.duration) === minutes} onClick={() => updateForm({ duration: minutes })} title={label(minutes)} />
            </div>
          ))}
        </div>
      </Section>
      <Section label="Exam hours to search" hint="The exam starts and ends inside these hours.">
        <div className="d-flex flex-row align-items-center gap-2">
          <TimeInput label="From" value={form.start_time} onChange={(value) => updateForm({ start_time: value })} />
          <span className="text-iron-500">to</span>
          <TimeInput label="To" value={form.end_time} onChange={(value) => updateForm({ end_time: value })} />
        </div>
      </Section>
      {error && (
        <Section>
          <Note icon="lucide:triangle-alert">
            <span className="fw-semibold d-block">{error.title}</span>
            {error.description}
          </Note>
        </Section>
      )}
    </WizardStep>
  );
}

export default ChooseDurationStep;

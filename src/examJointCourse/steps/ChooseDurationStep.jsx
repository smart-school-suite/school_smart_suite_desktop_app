import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Dot } from "lucide-react";
import { Note, TextButton, WizardFooter, WizardStep } from "../../components/SemesterTimetable/ConstraintWizard/WizardPrimitives";
import { formatExamDate, MinutesInput, TimeRange } from "../../examTimetable/constraints/fields";
import { isRange } from "../../utils/examTimetable/buildRequest";
import { describeError } from "../../utils/jointCourseTimetable/recommendSlot";
import { formatDuration } from "../../utils/semesterTimetable/timeUtils";

const DURATIONS = [60, 90, 120, 150, 180, 240];

const selectedCard = (isSelected) =>
  isSelected
    ? "border-1 border-solid border-primary-500 text-primary-500 bg-primary-50"
    : "border-1 border-solid border-iron-200 bg-white";

function Heading({ number, title, text }) {
  return (
    <div>
      <div className="d-flex flex-row align-items-center gap-1 fw-semibold">
        <span>{number}</span>
        <Dot size={12} />
        <span>{title}</span>
      </div>
      <span className="font-size-sm text-iron-500">{text}</span>
    </div>
  );
}

function CheckBubble({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="bg-primary-500 text-white rounded-circle p-1 d-flex align-items-center justify-content-center"
          style={{ width: "18px", height: "18px" }}
        >
          <Check size={11} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ChooseDurationStep({ nextStep, drawerData }) {
  const { course, dates, form, updateForm, proposal, generate, runGenerate } = drawerData;
  const missing = course.specialties_without_exam ?? [];
  const minutes = Number(form.duration);
  const hoursValid = isRange(form.start_time, form.end_time);
  const valid = form.dates.length > 0 && minutes >= 15 && hoursValid;
  const lengths = DURATIONS.includes(minutes) || !minutes ? DURATIONS : [...DURATIONS, minutes].sort((a, b) => a - b);

  const toggleDate = (date) =>
    updateForm({ dates: form.dates.includes(date) ? form.dates.filter((item) => item !== date) : [...form.dates, date] });

  const handleNext = () => (proposal ? nextStep() : runGenerate(nextStep));

  return (
    <WizardStep
      title="When can the joint exam take place?"
      description="Choose the dates, how long the exam lasts and the hours to search. We'll list every time all the linked specialties' students are free and enough halls and invigilators are, and you pick one."
      footer={
        <WizardFooter
          onNext={handleNext}
          nextLabel={generate.isPending ? "Finding free times…" : "Find free times"}
          nextDisabled={!valid || generate.isPending}
          nextIcon="lucide:sparkles"
          hint={
            dates.length === 0
              ? "The exam periods share no date"
              : form.dates.length === 0
                ? "Choose at least one date"
                : !hoursValid
                  ? "Exam hours must end after they start"
                  : "Choose an exam length of at least 15 minutes"
          }
        />
      }
    >
      <div className="d-flex flex-column gap-4">
        {generate.error && (
          <div className="jcs-alert jcs-alert--danger" role="alert">
            <Icon icon="lucide:circle-x" width={18} height={18} className="jcs-alert__icon" />
            <div className="d-flex flex-column gap-1">
              <span className="fw-semibold">{generate.error?.response?.data?.errors?.title ?? "Couldn't find free times"}</span>
              <span>{describeError(generate.error, "Something went wrong. Try again.")}</span>
            </div>
          </div>
        )}

        <div className="jcs-context">
          {(course.specialties ?? []).map((specialty) => (
            <span
              key={specialty.exam_id}
              className="jcs-context__item"
              title={`Exam period ${formatExamDate(specialty.exam_period?.start_date, "d MMM yyyy")} – ${formatExamDate(specialty.exam_period?.end_date, "d MMM yyyy")}`}
            >
              <Icon icon="lucide:graduation-cap" width={14} height={14} />
              {specialty.label}
            </span>
          ))}
        </div>

        {missing.length > 0 && (
          <Note>
            {missing.map((item) => item.label).join(", ")} take{missing.length === 1 ? "s" : ""} this course but{" "}
            {missing.length === 1 ? "has" : "have"} no {course.exam_type?.name ?? "exam"} yet. Free times are still found for the
            specialties above; once {missing.length === 1 ? "its" : "their"} exam is created, find the times again so{" "}
            {missing.length === 1 ? "its" : "their"} students are checked too.
          </Note>
        )}

        <div className="d-flex flex-column gap-2">
          <Heading number="01" title="Exam Dates" text="The dates inside every linked specialty's exam period." />
          {dates.length === 0 ? (
            <div className="jcs-alert jcs-alert--warn" role="status">
              <Icon icon="lucide:calendar-x-2" width={18} height={18} className="jcs-alert__icon" />
              <span>The exam periods of the linked specialties have no date in common. Align their exam dates first.</span>
            </div>
          ) : (
            <>
              <div className="jcs-days" role="group" aria-label="Exam dates">
                {dates.map((date, index) => {
                  const isSelected = form.dates.includes(date);
                  return (
                    <motion.button
                      key={date}
                      type="button"
                      className={`cw-day jcs-day ${isSelected ? "is-selected" : ""}`}
                      aria-pressed={isSelected}
                      onClick={() => toggleDate(date)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      layout
                    >
                      <span className="jcs-day__name">{formatExamDate(date, "EEE d MMM")}</span>
                      <span className="jcs-day__meta">Day {index + 1} of {dates.length}</span>
                    </motion.button>
                  );
                })}
              </div>
              <div className="d-flex flex-row gap-3">
                <TextButton icon="lucide:check-check" tone="muted" onClick={() => updateForm({ dates })}>
                  All dates
                </TextButton>
                <TextButton icon="lucide:eraser" tone="muted" onClick={() => updateForm({ dates: [] })}>
                  Clear
                </TextButton>
              </div>
            </>
          )}
        </div>

        <div className="d-flex flex-column gap-2">
          <Heading number="02" title="Exam Length" text="How long should the exam last?" />
          <div className="d-grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))" }}>
            {lengths.map((length) => {
              const isSelected = minutes === length;
              return (
                <motion.div
                  key={length}
                  role="radio"
                  aria-checked={isSelected}
                  tabIndex={0}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  layout
                  className={`card p-2 rounded-3 d-flex flex-column gap-3 cursor-pointer ${selectedCard(isSelected)}`}
                  onClick={() => updateForm({ duration: length })}
                  onKeyDown={(event) => (event.key === "Enter" || event.key === " ") && updateForm({ duration: length })}
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <span className="font-size-xs text-iron-500">{length} min</span>
                    <CheckBubble show={isSelected} />
                  </div>
                  <span className="font-size-md fw-medium">{formatDuration(length)}</span>
                </motion.div>
              );
            })}
          </div>
          <div className="d-flex flex-column gap-1" style={{ width: "12rem" }}>
            <span className="font-size-xs fw-medium">Another length (minutes)</span>
            <div>
              <MinutesInput value={DURATIONS.includes(minutes) ? null : minutes || null} onChange={(value) => updateForm({ duration: value ?? 120 })} />
            </div>
          </div>
        </div>

        <div className="d-flex flex-column gap-2">
          <Heading number="03" title="Exam Hours" text="The exam starts and ends inside these hours on every chosen date." />
          <TimeRange
            start={form.start_time}
            end={form.end_time}
            onStart={(value) => updateForm({ start_time: value })}
            onEnd={(value) => updateForm({ end_time: value })}
          />
        </div>
      </div>
    </WizardStep>
  );
}

export default ChooseDurationStep;

import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
import {
  EmptyState,
  Section,
  Stats,
  WizardFooter,
  WizardStep,
} from "../../../../components/SemesterTimetable/ConstraintWizard/WizardPrimitives";
import { useJointCourseDraft } from "../../../../hooks/jointCourseTimetable/useJointCourseDraft";
import { setDaySlotCount } from "../../../../Slices/jointCourse/jointCourseTimetableSlice";
import { totalSlotCount } from "../../../../utils/jointCourseTimetable/slotDraft";
import { MAX_SLOTS_PER_COURSE } from "../../../../utils/jointCourseTimetable/slotValidation";
import { dayLabel, sortDays } from "../../../../utils/semesterTimetable/timeUtils";

function ConfigureDailySlots({ nextStep, previousStep, drawerData }) {
  const dispatch = useDispatch();
  const { courseId, days, counts } = useJointCourseDraft(drawerData.course);
  const ordered = sortDays(days);
  const unset = ordered.filter((day) => !counts[day]);
  const total = totalSlotCount(ordered, counts);
  const atLimit = total >= MAX_SLOTS_PER_COURSE;
  const setCount = (day, count) => dispatch(setDaySlotCount({ courseId, day, count }));

  return (
    <WizardStep
      title="How many slots does each day need?"
      description="Set the number of separate teaching slots on each day. A slot is one block of teaching time in one hall; you'll set its exact time and hall next."
      footer={
        <WizardFooter
          onBack={previousStep}
          onNext={nextStep}
          nextLabel="Set times and halls"
          nextDisabled={ordered.length === 0 || unset.length > 0}
          hint={
            ordered.length === 0
              ? "Go back and select a day"
              : `Set the slots for ${unset.map(dayLabel).join(", ")}`
          }
        />
      }
    >
      {ordered.length === 0 ? (
        <EmptyState
          title="No teaching days selected"
          text="Go back and choose the days this course holds."
        />
      ) : (
        <>
          <Section label="Slots per day">
            <ul className="jcs-counts">
              {ordered.map((day) => (
                <DayCountRow
                  key={day}
                  day={day}
                  count={counts[day] ?? null}
                  remaining={MAX_SLOTS_PER_COURSE - total}
                  onChange={(count) => setCount(day, count)}
                />
              ))}
            </ul>
            {atLimit && (
              <p className="jcs-field-hint mt-2 mb-0">
                A joint course can have at most {MAX_SLOTS_PER_COURSE} slots a week.
              </p>
            )}
          </Section>

          <Section label="This week">
            <Stats
              items={[
                { label: "Teaching days", value: ordered.length },
                { label: "Slots", value: total },
                { label: "Still to set", value: unset.length },
              ]}
            />
          </Section>
        </>
      )}
    </WizardStep>
  );
}

/** One day with a stepper. `count` is null until the admin sets it. */
function DayCountRow({ day, count, remaining, onChange }) {
  const isSet = count !== null;
  return (
    <li className={`jcs-count ${isSet ? "" : "is-unset"}`}>
      <div className="d-flex flex-column">
        <span className="fw-medium">{dayLabel(day)}</span>
        <span className="jcs-field-hint">
          {isSet ? `${count} slot${count === 1 ? "" : "s"}` : "Not set yet"}
        </span>
      </div>
      <div className="jcs-stepper" role="group" aria-label={`Slots on ${dayLabel(day)}`}>
        <button
          type="button"
          className="jcs-stepper__btn"
          onClick={() => onChange(count - 1)}
          disabled={!isSet || count <= 1}
          aria-label={`One fewer slot on ${dayLabel(day)}`}
        >
          <Icon icon="lucide:minus" width={14} height={14} />
        </button>
        <input
          type="number"
          min={1}
          inputMode="numeric"
          className="jcs-stepper__value"
          value={isSet ? count : ""}
          placeholder="–"
          aria-label={`Number of slots on ${dayLabel(day)}`}
          onChange={(event) => {
            const value = parseInt(event.target.value, 10);
            if (Number.isInteger(value) && value >= 1 && value <= (count ?? 0) + remaining) {
              onChange(value);
            }
          }}
        />
        <button
          type="button"
          className="jcs-stepper__btn"
          onClick={() => onChange(isSet ? count + 1 : 1)}
          disabled={remaining <= 0}
          aria-label={`One more slot on ${dayLabel(day)}`}
        >
          <Icon icon="lucide:plus" width={14} height={14} />
        </button>
      </div>
    </li>
  );
}

export default ConfigureDailySlots;

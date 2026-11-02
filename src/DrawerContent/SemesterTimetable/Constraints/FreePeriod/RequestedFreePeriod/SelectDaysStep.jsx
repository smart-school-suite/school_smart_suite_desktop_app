import { useDispatch, useSelector } from "react-redux";
import {
  DayPicker,
  Note,
  Section,
  WizardFooter,
  WizardStep,
} from "../../../../../components/SemesterTimetable/ConstraintWizard/WizardPrimitives";
import {
  addRequestedFreePeriodDays,
  removeRequestedFreePeriodDays,
} from "../../../../../Slices/SemesterTimetable/semesterTimetableSlice";
import {
  dayLabel,
  resolveScheduleDays,
  sortDays,
} from "../../../../../utils/semesterTimetable/timeUtils";

function SelectDaysStep({ nextStep, previousStep }) {
  const dispatch = useDispatch();
  const opDays = useSelector(
    (state) =>
      state.semesterTimetable.hard_constraints.operational_period
        .operational_days,
  );
  const rFDays = useSelector(
    (state) =>
      state.semesterTimetable.soft_constraints.requested_free_periods.days,
  );
  const slots = useSelector(
    (state) =>
      state.semesterTimetable.soft_constraints.requested_free_periods.slots,
  );

  const toggleDay = (day, isSelected) =>
    dispatch(
      isSelected
        ? removeRequestedFreePeriodDays({ day })
        : addRequestedFreePeriodDays({ day }),
    );

  const daysWithSlots = slots.filter((item) => item.slots?.length).length;

  return (
    <WizardStep
      title="Which days need free periods?"
      description="Select the days where students should have time without class."
      footer={
        <WizardFooter
          onBack={previousStep}
          onNext={nextStep}
          nextDisabled={rFDays.length === 0}
          hint="Select at least one day"
        />
      }
    >
      <Section
        label="Days"
        hint={
          rFDays.length
            ? `${rFDays.length} selected · ${sortDays(rFDays).map(dayLabel).join(", ")}`
            : "Only operating days can be selected"
        }
      >
        <DayPicker
          selected={rFDays}
          available={resolveScheduleDays(opDays)}
          onToggle={toggleDay}
        />
      </Section>

      <Section>
        <Note>
          {daysWithSlots > 0 ? (
            <>
              Removing a day also removes the free periods already set for it.
            </>
          ) : (
            <>Next you will set the exact times to keep free on each day.</>
          )}
        </Note>
      </Section>
    </WizardStep>
  );
}

export default SelectDaysStep;

import { useDispatch, useSelector } from "react-redux";
import {
  DayPicker,
  Note,
  Section,
  WizardFooter,
  WizardStep,
} from "../../../../../components/SemesterTimetable/ConstraintWizard/WizardPrimitives";
import { setOperationalPeriodField } from "../../../../../Slices/SemesterTimetable/semesterTimetableSlice";
import { dayLabel, sortDays } from "../../../../../utils/semesterTimetable/timeUtils";

function OperatingDaysStep({ nextStep, previousStep }) {
  const dispatch = useDispatch();
  const opDays = useSelector(
    (state) =>
      state.semesterTimetable.hard_constraints.operational_period
        .operational_days,
  );

  // The reducer toggles: dispatching an existing day removes it.
  const toggleDay = (day) =>
    dispatch(setOperationalPeriodField({ field: "operational_days", value: day }));

  const summary = opDays.length
    ? sortDays(opDays).map(dayLabel).join(", ")
    : null;

  return (
    <WizardStep
      title="Operating days"
      description="Choose the days of the week your institution holds classes. Days you leave out are never used by the timetable generator."
      footer={
        <WizardFooter
          onBack={previousStep}
          onNext={nextStep}
          nextDisabled={opDays.length === 0}
          hint="Select at least one day"
        />
      }
    >
      <Section
        label="Days of the week"
        hint={
          summary
            ? `${opDays.length} selected · ${summary}`
            : "Nothing selected yet"
        }
      >
        <DayPicker selected={opDays} onToggle={toggleDay} />
      </Section>

      <Section>
        <Note>
          Every selected day uses the normal operating hours. You can give
          individual days different hours in the next steps.
        </Note>
      </Section>
    </WizardStep>
  );
}

export default OperatingDaysStep;

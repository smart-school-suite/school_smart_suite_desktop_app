import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import {
  ChoiceCard,
  DayList,
  DayRow,
  Section,
  TimeSpan,
  WizardFooter,
  WizardStep,
} from "../../../../../components/SemesterTimetable/ConstraintWizard/WizardPrimitives";
import ToastSuccess from "../../../../../components/Toast/ToastSuccess";
import { resolveScheduleDays } from "../../../../../utils/semesterTimetable/timeUtils";

function ReviewDefaultStep({ handleClose, nextStep, previousStep }) {
  const breakPeriod = useSelector(
    (state) => state.semesterTimetable.hard_constraints.break_period,
  );
  const operationalPeriod = useSelector(
    (state) => state.semesterTimetable.hard_constraints.operational_period,
  );
  const days = resolveScheduleDays(operationalPeriod.operational_days);
  const usingFullWeek = operationalPeriod.operational_days.length === 0;

  const finish = () => {
    handleClose();
    toast.custom(
      <ToastSuccess
        title={"Configuration Successfully Completed"}
        description={"Configuration has been successfully completed."}
      />,
    );
  };

  return (
    <WizardStep
      title="How the break applies across the week"
      description={
        usingFullWeek
          ? "No operating days are set yet, so the break is shown for the full week."
          : "Every operating day currently uses the default break."
      }
      footer={<WizardFooter onBack={previousStep} />}
    >
      <Section label="Weekly coverage">
        <DayList>
          {days.map((day) => (
            <DayRow key={day} day={day}>
              <TimeSpan
                start={breakPeriod.start_time.value}
                end={breakPeriod.end_time.value}
              />
            </DayRow>
          ))}
        </DayList>
      </Section>

      <Section
        label="Do any days need a different break?"
        hint="For example no break on a short day, or a later break on Fridays."
      >
        <div className="cw-choices">
          <ChoiceCard
            icon="lucide:calendar-check"
            title="No, every day uses this break"
            text="Apply the default break to all operating days and finish."
            onClick={finish}
          />
          <ChoiceCard
            icon="lucide:calendar-cog"
            title="Yes, some days are different"
            text="Remove the break from some days or give them another time."
            onClick={nextStep}
          />
        </div>
      </Section>
    </WizardStep>
  );
}

export default ReviewDefaultStep;

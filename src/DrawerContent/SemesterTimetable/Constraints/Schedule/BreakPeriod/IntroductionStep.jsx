import {
  Outline,
  Panel,
  PointList,
  SampleDay,
  Section,
  WizardFooter,
  WizardStep,
} from "../../../../../components/SemesterTimetable/ConstraintWizard/WizardPrimitives";

const WITHOUT_BREAK = [
  { time: "10:00", label: "Chemistry" },
  { time: "11:00", label: "Biology" },
  { time: "12:00", label: "Physics" },
  { time: "13:00", label: "History" },
];

const WITH_BREAK = [
  { time: "10:00", label: "Chemistry" },
  { time: "11:00", label: "Biology" },
  { time: "12:00", label: "Break", highlight: true },
  { time: "13:00", label: "Physics" },
];

function IntroductionStep({ nextStep }) {
  return (
    <WizardStep
      title="Protect time for a break"
      description="A break period is a block of the school day where no class can be placed, giving students and staff time to rest."
      footer={<WizardFooter onNext={nextStep} nextLabel="Get started" />}
    >
      <Section label="How it works">
        <Panel>
          <PointList
            items={[
              "The timetable generator never schedules a class inside a break.",
              "One default break applies to every operating day.",
              "Individual days can skip the break or use a different time.",
            ]}
          />
        </Panel>
      </Section>

      <Section label="Effect on a school day">
        <div className="cw-samples">
          <SampleDay caption="Without a break" rows={WITHOUT_BREAK} />
          <SampleDay caption="With a 12:00 break" rows={WITH_BREAK} />
        </div>
      </Section>

      <Section label="What you will set up">
        <Outline
          items={[
            {
              title: "Default break",
              text: "The break time used on a normal day.",
            },
            {
              title: "Days without a break",
              text: "Days where classes continue without a pause.",
            },
            {
              title: "Custom break days",
              text: "Days where the break starts or ends at another time.",
            },
            {
              title: "Review",
              text: "Confirm the break policy for the whole week.",
            },
          ]}
        />
      </Section>
    </WizardStep>
  );
}

export default IntroductionStep;

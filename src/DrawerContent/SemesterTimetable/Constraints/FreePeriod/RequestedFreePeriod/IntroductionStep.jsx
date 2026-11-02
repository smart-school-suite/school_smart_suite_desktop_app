import {
  Outline,
  Panel,
  PointList,
  SampleDay,
  Section,
  WizardFooter,
  WizardStep,
} from "../../../../../components/SemesterTimetable/ConstraintWizard/WizardPrimitives";

const WITHOUT_FREE = [
  { time: "08:00", label: "Mathematics" },
  { time: "09:00", label: "English" },
  { time: "10:00", label: "Chemistry" },
  { time: "11:00", label: "Biology" },
];

const WITH_FREE = [
  { time: "08:00", label: "Mathematics" },
  { time: "09:00", label: "English" },
  { time: "10:00", label: "Free period", highlight: true },
  { time: "11:00", label: "Biology" },
];

function IntroductionStep({ nextStep }) {
  return (
    <WizardStep
      title="Leave intentional gaps for students"
      description="Requested free periods are times when students should not have class, even though the institution is open."
      footer={<WizardFooter onNext={nextStep} nextLabel="Get started" />}
    >
      <Section label="How it works">
        <Panel>
          <PointList
            items={[
              "The generator tries to keep these times empty in student timetables.",
              "This is a soft constraint: it can be relaxed if no valid timetable exists otherwise.",
              "Teachers and halls can still be scheduled for other groups at these times.",
            ]}
          />
        </Panel>
      </Section>

      <Section label="Effect on a school day">
        <div className="cw-samples">
          <SampleDay caption="Without free periods" rows={WITHOUT_FREE} />
          <SampleDay caption="With a 10:00 free period" rows={WITH_FREE} />
        </div>
      </Section>

      <Section label="What you will set up">
        <Outline
          items={[
            {
              title: "Days",
              text: "The days that should include free periods.",
            },
            {
              title: "Free periods",
              text: "The exact time ranges to keep free on each day.",
            },
            {
              title: "Review",
              text: "Check every free period before saving.",
            },
          ]}
        />
      </Section>
    </WizardStep>
  );
}

export default IntroductionStep;

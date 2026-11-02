import {
  Note,
  Outline,
  Panel,
  PointList,
  Section,
  WizardFooter,
  WizardStep,
} from "../../../../../components/SemesterTimetable/ConstraintWizard/WizardPrimitives";

function IntroductionStep({ nextStep }) {
  return (
    <WizardStep
      title="When can classes take place?"
      description="The operational period is the window in which your institution is open for teaching. The timetable generator never places a class outside it."
      footer={<WizardFooter onNext={nextStep} nextLabel="Get started" />}
    >
      <Section label="How it works">
        <Panel>
          <PointList
            items={[
              "Classes are only scheduled on the days and between the hours you set here.",
              "Any time outside these hours is treated as unavailable.",
              "Days can have their own hours when they do not follow the normal schedule.",
            ]}
          />
        </Panel>
      </Section>

      <Section>
        <Note icon="lucide:lightbulb">
          <strong>Example:</strong> an institution open 8:00 AM – 5:00 PM will
          never have a class before 8:00 AM or after 5:00 PM.
        </Note>
      </Section>

      <Section label="What you will set up">
        <Outline
          items={[
            {
              title: "Operating hours",
              text: "The opening and closing time used on a typical day.",
            },
            {
              title: "Operating days",
              text: "The days of the week classes can be scheduled.",
            },
            {
              title: "Exceptions",
              text: "Days that open later, close earlier, or both.",
            },
          ]}
        />
      </Section>
    </WizardStep>
  );
}

export default IntroductionStep;

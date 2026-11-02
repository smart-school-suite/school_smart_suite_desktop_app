import {
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
      title="How long is a teaching period?"
      description="Period duration sets the length of every teaching slot. The timetable generator uses it to divide each school day into periods."
      footer={<WizardFooter onNext={nextStep} nextLabel="Get started" />}
    >
      <Section label="Why it matters">
        <Panel>
          <PointList
            items={[
              {
                title: "Controls lesson length",
                text: "Each class session gets exactly this much teaching time.",
              },
              {
                title: "Shapes the timetable grid",
                text: "Longer periods mean fewer periods fit in a day, and shorter periods mean more.",
              },
              {
                title: "Works per day",
                text: "Days can use a different duration when your policy needs it.",
              },
            ]}
          />
        </Panel>
      </Section>

      <Section label="What you will set up">
        <Outline
          items={[
            {
              title: "Default duration",
              text: "The period length used on a normal day.",
            },
            {
              title: "Custom duration days",
              text: "Days with longer or shorter periods, such as practical days.",
            },
            {
              title: "Review",
              text: "Check the period length for every day of the week.",
            },
          ]}
        />
      </Section>
    </WizardStep>
  );
}

export default IntroductionStep;

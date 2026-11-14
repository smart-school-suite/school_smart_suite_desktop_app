import ConstraintWizard from "../../components/SemesterTimetable/ConstraintWizard/ConstraintWizard";
import {
  DayList,
  EmptyState,
  Note,
  Panel,
  PointList,
  Section,
  WizardFooter,
  WizardStep,
} from "../../components/SemesterTimetable/ConstraintWizard/WizardPrimitives";
import { configurationProblems } from "../../utils/examTimetable/buildRequest";
import { useExamSetup } from "./fields";
import { useKindState, useTimetableKind } from "../TimetableKindContext";

/**
 * Every exam constraint editor is the same three steps as the semester
 * constraints: what it does, configure it, review it. `editor` provides
 * { points, Configure, summary(constraints, setup) => [{ label, value }] }.
 */
export function makeExamConstraintEditor(editor) {
  const Intro = ({ nextStep, drawerData }) => (
    <WizardStep
      title={drawerData.constraint?.name}
      description={drawerData.constraint?.description}
      footer={<WizardFooter onNext={nextStep} nextLabel="Get started" />}
    >
      <Section label="How the scheduler uses it">
        <Panel>
          <PointList items={editor.points} />
        </Panel>
      </Section>
    </WizardStep>
  );

  const Configure = ({ nextStep, previousStep, drawerData }) => {
    const setup = useExamSetup();
    return (
      <WizardStep
        title={editor.configureTitle ?? "Configure"}
        description={editor.configureDescription}
        footer={<WizardFooter onBack={previousStep} onNext={nextStep} nextLabel="Review" />}
      >
        <editor.Configure setup={setup} constraint={drawerData.constraint} />
      </WizardStep>
    );
  };

  const Review = ({ previousStep, handleClose, drawerData }) => {
    const kind = useTimetableKind();
    const constraints = useKindState((state) => state.constraints);
    const setup = useExamSetup();
    const rows = editor.summary(constraints, setup);
    const problems = configurationProblems(constraints).filter((problem) => problem.key === drawerData.constraint?.key);

    return (
      <WizardStep
        title="Review"
        description={`These settings are sent with the next generation of the ${kind.noun} timetable.`}
        footer={<WizardFooter onBack={previousStep} onNext={handleClose} nextLabel="Done" nextIcon="lucide:check" />}
      >
        {problems.length > 0 && (
          <Section>
            {problems.map((problem) => (
              <Note key={problem.text} icon="lucide:triangle-alert">{problem.text}</Note>
            ))}
          </Section>
        )}
        <Section label="Summary">
          {rows.length === 0 ? (
            <EmptyState icon="lucide:list" title="Nothing set" text={editor.emptyText ?? "The scheduler uses its defaults."} />
          ) : (
            <DayList>
              {rows.map((row, index) => (
                <li key={`${row.label}-${index}`} className="cw-dayrow">
                  <span className="cw-dayrow__day">{row.label}</span>
                  <span className="cw-dayrow__value">{row.value}</span>
                </li>
              ))}
            </DayList>
          )}
        </Section>
      </WizardStep>
    );
  };

  const flow = [
    { step: "INTRO", label: "What it does", component: Intro },
    { step: "CONFIGURE", label: editor.configureTitle ?? "Configure", component: Configure },
    { step: "REVIEW", label: "Review", component: Review },
  ];

  return function ExamConstraintEditor({ handleClose, constraint }) {
    return (
      <ConstraintWizard
        flow={flow}
        constraint={constraint}
        handleClose={handleClose}
        drawerData={{ constraint }}
      />
    );
  };
}

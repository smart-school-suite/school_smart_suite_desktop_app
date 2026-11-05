import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Note,
  Section,
  TextButton,
  WizardFooter,
  WizardStep,
} from "../../../../components/SemesterTimetable/ConstraintWizard/WizardPrimitives";
import { useJointCourseDraft } from "../../../../hooks/jointCourseTimetable/useJointCourseDraft";
import {
  discardSlotDraft,
  dismissDraftNotice,
  toggleTeachingDay,
} from "../../../../Slices/jointCourse/jointCourseTimetableSlice";
import { dayLabel, sortDays } from "../../../../utils/semesterTimetable/timeUtils";
import TeachingDaySelector from "../components/TeachingDaySelector";

const COURSE_ASSIGNMENT_PATH = "/teacher-course";

function SelectTeachingDays({ nextStep, handleClose, drawerData }) {
  const dispatch = useDispatch();
  const course = drawerData.course;
  const { courseId, draft, days, counts, teachers } = useJointCourseDraft(course);
  const hasLecturer = teachers.length > 0;

  return (
    <WizardStep
      title="Which days does this course hold?"
      description="Pick every day the joint course meets. Next you'll say how many slots each day needs, then set their times and halls."
      footer={
        <WizardFooter
          onNext={nextStep}
          nextLabel="Set slots per day"
          nextDisabled={!hasLecturer || days.length === 0}
          hint={hasLecturer ? "Select at least one day" : "Assign a lecturer first"}
        />
      }
    >
      {!hasLecturer && (
        <LecturerRequired
          title={course.course?.title}
          onAssign={handleClose}
        />
      )}

      {hasLecturer && draft?.restored && (
        <div className="mb-3">
          <Note icon="lucide:history">
            <div className="d-flex flex-row align-items-center justify-content-between gap-2">
              <span>We kept the changes you hadn't saved last time.</span>
              <span className="d-flex flex-row gap-2">
                <TextButton
                  tone="muted"
                  onClick={() => dispatch(discardSlotDraft({ course }))}
                >
                  Start over
                </TextButton>
                <TextButton onClick={() => dispatch(dismissDraftNotice(courseId))}>
                  Keep
                </TextButton>
              </span>
            </div>
          </Note>
        </div>
      )}

      <Section
        label="Teaching days"
        hint={
          days.length
            ? `${days.length} day${days.length === 1 ? "" : "s"}: ${sortDays(days).map(dayLabel).join(", ")}`
            : "No day selected yet"
        }
      >
        <TeachingDaySelector
          selected={days}
          counts={counts}
          disabled={!hasLecturer}
          onToggle={(day) => dispatch(toggleTeachingDay({ courseId, day }))}
        />
        {hasLecturer && days.length === 0 && (
          <p className="jcs-field-hint mt-2 mb-0">
            Select at least one day to continue.
          </p>
        )}
      </Section>
    </WizardStep>
  );
}

function LecturerRequired({ title, onAssign }) {
  const navigate = useNavigate();
  return (
    <div className="jcs-alert jcs-alert--warn mb-3" role="alert">
      <Icon icon="lucide:user-round-x" width={18} height={18} className="jcs-alert__icon" />
      <div className="d-flex flex-column gap-1">
        <span className="fw-semibold">A lecturer must be assigned first</span>
        <span>
          {title ?? "This course"} has no lecturer yet. Times are checked against the
          lecturer's other classes, so assign one through course assignment, then come back
          to set the times.
        </span>
        <button
          type="button"
          className="cw-text-btn jcs-link"
          onClick={() => {
            onAssign();
            navigate(COURSE_ASSIGNMENT_PATH);
          }}
        >
          <span>Go to course assignment</span>
          <Icon icon="lucide:arrow-up-right" width={15} height={15} />
        </button>
      </div>
    </div>
  );
}

export default SelectTeachingDays;

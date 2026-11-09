import { Icon } from "@iconify/react";
import { Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge, EmptyState, Section, Stats, TimeSpan, WizardFooter, WizardStep } from "../../components/SemesterTimetable/ConstraintWizard/WizardPrimitives";
import "../../styles/jointCourseSlots.css";
import { formatExamDate, SetupNotice, useJointCourseReadiness } from "./fields";

const JOINT_COURSE_TIMETABLE_PATH = "/exam/joint-course-timetable";

/**
 * Read-only view of the exam's joint courses. Their times are set on the Joint
 * Course Timetable page; this timetable places them there, and generation waits
 * until every one has a time.
 */
function JointCoursesPanel({ handleClose, constraint }) {
  const navigate = useNavigate();
  const readiness = useJointCourseReadiness();
  const { exam, joint, scheduled, unscheduled, isLoading, error } = readiness;

  const openJointTimetable = () => {
    handleClose();
    navigate(JOINT_COURSE_TIMETABLE_PATH);
  };

  const body = () => {
    if (!exam || error) return <SetupNotice {...readiness} />;
    if (isLoading) {
      return (
        <div className="d-flex flex-column gap-2">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="ctl-skeleton" style={{ height: "5rem" }} />
          ))}
        </div>
      );
    }
    if (joint.length === 0) {
      return <EmptyState icon="lucide:users" title="No joint courses" text="This exam has no course shared with other specialties, so there is nothing to wait for." />;
    }

    return (
      <div className="d-flex flex-column gap-4">
        <Stats
          items={[
            { label: "Joint courses", value: joint.length },
            { label: "Time set", value: scheduled.length },
            { label: "Waiting", value: unscheduled.length },
          ]}
        />

        {unscheduled.length > 0 && <ConfigureFallback courses={unscheduled} allMissing={scheduled.length === 0} onConfigure={openJointTimetable} />}

        {scheduled.length > 0 && <Schedules courses={scheduled} />}
      </div>
    );
  };

  return (
    <div className="cw" role="document">
      <header className="cw-header font-size-sm p-2">
        <div className="cw-header__top">
          <div className="cw-header__titles">
            <div className="cw-eyebrow font-size-xs">
              <span>{constraint?.category ?? "Courses"}</span>
              <span className="cw-eyebrow__sep" aria-hidden="true" />
              <span className="cw-type d-inline-flex align-items-center gap-1">
                <Lock size={11} /> Read only
              </span>
            </div>
            <h2 className="cw-title font-size-sm fw-medium">{constraint?.name ?? "Joint Courses"}</h2>
          </div>
          <button type="button" className="cw-icon-btn" onClick={handleClose} aria-label="Close">
            <Icon icon="lucide:x" width={18} height={18} />
          </button>
        </div>
      </header>

      <WizardStep
        title="Courses examined with other specialties"
        description="A course several specialties take is examined once, at the same time for all of them. Its time is set on the Joint Course Timetable page and this timetable places it exactly there, so it can't be changed here."
        // While times are missing, the fallback carries the call to configure them.
        footer={
          unscheduled.length === 0 && (
            <WizardFooter onNext={openJointTimetable} nextLabel="Open joint course timetable" nextIcon="lucide:arrow-up-right" />
          )
        }
      >
        {body()}
      </WizardStep>
    </div>
  );
}

/** Shown while joint courses have no time: generation is blocked until they do. */
function ConfigureFallback({ courses, allMissing, onConfigure }) {
  return (
    <div className="d-flex flex-column align-items-center text-center gap-2 border rounded-3 bg-white p-3">
      <img src="/sss-maskot/timetable.png" alt="" aria-hidden="true" style={{ height: "140px", width: "140px", objectFit: "contain" }} />
      <span className="fw-semibold">
        {allMissing ? "Set the joint course exam times first" : `${courses.length} joint course${courses.length === 1 ? " still needs" : "s still need"} a time`}
      </span>
      <span className="font-size-sm text-iron-500" style={{ maxWidth: "28rem" }}>
        This exam timetable can't be generated until every joint course has its exam time. Configure{" "}
        {courses.length === 1 ? "it" : "them"} on the Joint Course Timetable page, then come back and generate.
      </span>
      <div className="jcs-context justify-content-center mb-0">
        {courses.map((course) => (
          <span key={course.course_id} className="jcs-context__item jcs-context__item--warn">
            <Icon icon="lucide:clock-alert" width={14} height={14} />
            {course.course_title}
          </span>
        ))}
      </div>
      <button type="button" className="cw-btn cw-btn--primary mt-1" onClick={onConfigure}>
        <span>Configure joint course timetable</span>
        <Icon icon="lucide:arrow-up-right" width={16} height={16} />
      </button>
    </div>
  );
}

/** The joint exam times, by date, as fixed sessions. */
function Schedules({ courses }) {
  const dates = [...new Set(courses.map((course) => course.joint.slot.date))];
  return dates.map((date) => {
    const onDate = courses.filter((course) => course.joint.slot.date === date);
    return (
      <Section key={date} label={formatExamDate(date, "EEEE d MMMM yyyy")} hint={`${onDate.length} joint exam${onDate.length === 1 ? "" : "s"}`}>
        <div className="row g-2">
          {onDate.map((course) => (
            <div key={course.course_id} className="col-12 col-xl-6">
              <div className="card rounded-3 p-3 h-100 d-flex flex-column gap-2 border-1 border-solid border-iron-200 bg-white">
                <div className="d-flex flex-row align-items-start justify-content-between gap-2">
                  <span className="cw-option__title">
                    <TimeSpan start={course.joint.slot.start_time} end={course.joint.slot.end_time} />
                  </span>
                  <Badge tone="success">Time set</Badge>
                </div>
                <div className="d-flex flex-column">
                  <span className="fw-semibold text-truncate">{course.course_title}</span>
                  <span className="cw-option__meta">{[course.course_code, formatExamDate(date, "EEE d MMM")].filter(Boolean).join(" · ")}</span>
                </div>
                <span className="jcs-field-hint d-flex flex-row align-items-center gap-1">
                  <Lock size={12} /> Fixed by the Joint Course Timetable
                </span>
              </div>
            </div>
          ))}
        </div>
      </Section>
    );
  });
}

export default JointCoursesPanel;

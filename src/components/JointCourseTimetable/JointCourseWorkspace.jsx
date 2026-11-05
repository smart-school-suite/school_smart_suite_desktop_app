import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import JointCourseTimetableDrawer from "../../DrawerContent/JointCourseTimetable/ConfigureSlots/JointCourseTimetableDrawer";
import { useGetJointCourseTerm } from "../../hooks/jointCourseTimetable/useGetJointCourseTerm";
import { setJointCourseTerm } from "../../Slices/jointCourse/jointCourseTimetableSlice";
import { draftMatchesCourse } from "../../utils/jointCourseTimetable/slotDraft";
import { dayLabel, formatDuration, formatTime } from "../../utils/semesterTimetable/timeUtils";
import DrawerTrigger from "../drawer/DrawerTrigger";
import TermDropdown from "./TermDropdown";
import "../../styles/jointCourseSlots.css";

function JointCourseWorkspace() {
  const dispatch = useDispatch();
  const { term, selectedCourseId, drafts } = useSelector(
    (state) => state.jointCourseTimetable,
  );
  const { data } = useGetJointCourseTerm(term);
  const course = (data?.data?.courses ?? []).find((item) => item.id === selectedCourseId);
  const draft = course ? drafts?.[course.id] : null;
  const hasUnsaved = Boolean(draft && !draftMatchesCourse(draft, course));

  return (
    <div
      style={{ width: "75%", height: "100%" }}
      className="d-flex flex-column align-items-center px-2 gap-2"
    >
      <div className="d-flex flex-row justify-content-center w-100">
        <TermDropdown
          value={term}
          onChange={(value) => dispatch(setJointCourseTerm(value))}
        />
      </div>
      {course ? (
        <CourseOverview course={course} hasUnsaved={hasUnsaved} />
      ) : (
        <Placeholder
          text={
            term
              ? "Select a joint course from the list to see and set its weekly times."
              : "Choose an academic year and semester to see its joint courses."
          }
        />
      )}
    </div>
  );
}

function Placeholder({ text }) {
  return (
    <div className="d-flex flex-grow-1 align-items-center justify-content-center">
      <div className="d-flex flex-column align-items-center gap-2 text-center">
        <img
          src="/sss-maskot/timetable.png"
          alt="sss-timetable-maskot"
          style={{ height: "150px", width: "150px", objectFit: "contain" }}
        />
        <p className="mb-0 text-iron-500">{text}</p>
      </div>
    </div>
  );
}

function CourseOverview({ course, hasUnsaved }) {
  const configured = course.status === "configured";
  const teachers = course.teachers ?? [];
  const toRegenerate = (course.affected_timetables ?? []).filter(
    (timetable) => timetable.needs_regeneration,
  );

  return (
    <section className="jcs-overview w-100">
      <header className="jcs-overview__head">
        <div className="d-flex flex-column gap-1 min-w-0">
          <span className="jcs-overview__eyebrow">
            {[course.course?.code, course.course?.credit && `${course.course.credit} credits`]
              .filter(Boolean)
              .join(" · ")}
          </span>
          <span className="fw-semibold font-size-md text-truncate">{course.course?.title}</span>
          <span className="text-iron-500">
            {teachers.length ? `Lecturer: ${teachers.map((teacher) => teacher.name).join(", ")}` : "No lecturer assigned yet"}
          </span>
        </div>
        <div className="d-flex flex-row align-items-center gap-2 flex-shrink-0">
          {hasUnsaved && <span className="ctl-tag ctl-tag--soft">Unsaved changes</span>}
          <DrawerTrigger
            drawerChildren={JointCourseTimetableDrawer}
            drawerData={{ course }}
            showHeader={false}
            closeOnOutsideClick={false}
          >
            <button type="button" className="border-none rounded-3 font-size-sm px-3 py-2 primary-background text-white d-flex flex-row align-items-center gap-2">
              <Icon icon={configured ? "lucide:pencil" : "lucide:calendar-plus"} width={16} height={16} />
              <span>{hasUnsaved ? "Continue setting times" : configured ? "Edit times" : "Set times"}</span>
            </button>
          </DrawerTrigger>
        </div>
      </header>

      {course.specialties?.length > 0 && (
        <div className="d-flex flex-row flex-wrap gap-1">
          {course.specialties.map((specialty) => (
            <span key={specialty.school_semester_id} className="jcs-chip">
              {specialty.label}
            </span>
          ))}
        </div>
      )}

      <div className="d-flex flex-column gap-2">
        <span className="fw-medium">Weekly times</span>
        {configured ? (
          <ul className="jcs-overview__slots">
            {course.slots.map((slot) => (
              <li key={slot.id}>
                <span className="fw-medium">{dayLabel(slot.day)}</span>
                <span>
                  {formatTime(slot.start_time)} – {formatTime(slot.end_time)}
                </span>
                <span className="text-iron-500">{formatDuration(slot.duration_minutes)}</span>
                <span className="text-iron-500 text-truncate">{slot.hall?.name}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-iron-500 mb-0">
            No times set yet. The timetables of the specialties sharing this course can't be
            generated until it has them.
          </p>
        )}
      </div>

      {toRegenerate.length > 0 && (
        <div className="jcs-alert jcs-alert--warn">
          <Icon icon="lucide:refresh-cw" width={16} height={16} className="jcs-alert__icon" />
          <span>
            Generate these timetables again so they use the latest times:{" "}
            {toRegenerate.map((timetable) => timetable.label).join(", ")}.
          </span>
        </div>
      )}
    </section>
  );
}

export default JointCourseWorkspace;

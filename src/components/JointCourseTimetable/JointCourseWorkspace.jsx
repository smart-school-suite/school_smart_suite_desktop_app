import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import GenerateSlotsDrawer from "../../DrawerContent/JointCourseTimetable/GenerateSlots/GenerateSlotsDrawer";
import { useGetJointCourseTerm } from "../../hooks/jointCourseTimetable/useGetJointCourseTerm";
import { setJointCourseTerm } from "../../Slices/jointCourse/jointCourseTimetableSlice";
import { dayLabel, formatDuration, formatTime, sortDays } from "../../utils/semesterTimetable/timeUtils";
import DrawerTrigger from "../drawer/DrawerTrigger";
import TermDropdown from "./TermDropdown";
import "../../styles/jointCourseSlots.css";

function JointCourseWorkspace() {
  const dispatch = useDispatch();
  const { term, selectedCourseId } = useSelector((state) => state.jointCourseTimetable);
  const { data } = useGetJointCourseTerm(term);
  const course = (data?.data?.courses ?? []).find((item) => item.id === selectedCourseId);

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
      {!course ? (
        <Placeholder
          text={
            term
              ? "Select a joint course from the list to see and set its weekly slots."
              : "Choose an academic year and semester to see its joint courses."
          }
        />
      ) : (course.slots ?? []).length > 0 ? (
        <SavedSlots course={course} />
      ) : (
        <Placeholder text="This joint course has no slots yet. Generate them to find free times for its lecturer and halls.">
          <GenerateButton course={course} label="Generate" />
        </Placeholder>
      )}
    </div>
  );
}

function GenerateButton({ course, label, outline = false }) {
  return (
    <DrawerTrigger
      drawerChildren={GenerateSlotsDrawer}
      drawerData={{ course }}
      showHeader={false}
      closeOnOutsideClick={false}
    >
      <button
        type="button"
        className={`rounded-3 font-size-sm px-3 py-2 d-flex flex-row align-items-center gap-2 ${
          outline ? "bg-white border" : "border-none primary-background text-white"
        }`}
      >
        <Icon icon="lucide:sparkles" width={16} height={16} />
        <span>{label}</span>
      </button>
    </DrawerTrigger>
  );
}

function Placeholder({ text, children }) {
  return (
    <div className="d-flex flex-grow-1 align-items-center justify-content-center">
      <div className="d-flex flex-column align-items-center gap-2 text-center">
        <img
          src="/sss-maskot/timetable.png"
          alt="sss-timetable-maskot"
          style={{ height: "150px", width: "150px", objectFit: "contain" }}
        />
        <p className="mb-0 text-iron-500" style={{ maxWidth: "26rem" }}>{text}</p>
        {children}
      </div>
    </div>
  );
}

/** The course's saved weekly slots, grouped by day. */
function SavedSlots({ course }) {
  const days = sortDays([...new Set(course.slots.map((slot) => slot.day))]);
  const weeklyMinutes = course.weekly_minutes ?? course.slots.reduce((sum, slot) => sum + (slot.duration_minutes ?? 0), 0);

  return (
    <section className="w-100 d-flex flex-column gap-3 pt-2" style={{ maxWidth: "48rem" }}>
      <div className="d-flex flex-row align-items-center justify-content-between gap-2">
        <div className="d-flex flex-column">
          <span className="fw-semibold">Weekly slots</span>
          <span className="text-iron-500 font-size-xs">
            {course.slots.length} slot{course.slots.length === 1 ? "" : "s"} · {formatDuration(weeklyMinutes)} a week
          </span>
        </div>
        <GenerateButton course={course} label="Generate again" outline />
      </div>
      {days.map((day) => {
        const daySlots = course.slots.filter((slot) => slot.day === day);
        return (
          <div key={day} className="bg-white border rounded-3 px-3 py-2">
            <span className="fw-medium">{dayLabel(day)}</span>
            <ul className="list-unstyled mb-0">
              {daySlots.map((slot) => (
                <li key={slot.id} className="d-flex flex-row align-items-center gap-3 py-2 border-top font-size-sm">
                  <span style={{ minWidth: "10rem" }}>
                    {formatTime(slot.start_time)} – {formatTime(slot.end_time)}
                  </span>
                  <span className="text-iron-500" style={{ minWidth: "3rem" }}>
                    {formatDuration(slot.duration_minutes)}
                  </span>
                  <span className="text-truncate">{slot.hall?.name}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </section>
  );
}

export default JointCourseWorkspace;

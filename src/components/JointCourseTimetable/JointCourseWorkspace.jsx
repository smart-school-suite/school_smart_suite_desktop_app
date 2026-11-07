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

/** The course's saved weekly slots as cards grouped by day, like the semester timetable. */
function SavedSlots({ course }) {
  const days = sortDays([...new Set(course.slots.map((slot) => slot.day))]);
  const weeklyMinutes = course.weekly_minutes ?? course.slots.reduce((sum, slot) => sum + (slot.duration_minutes ?? 0), 0);

  return (
    <section className="w-100 d-flex flex-column gap-3 pt-2 flex-grow-1" style={{ minHeight: 0 }}>
      <div className="d-flex flex-row align-items-center justify-content-between gap-2">
        <div className="d-flex flex-column">
          <span className="fw-semibold">Weekly slots</span>
          <span className="text-iron-500 font-size-xs">
            {course.slots.length} slot{course.slots.length === 1 ? "" : "s"} · {formatDuration(weeklyMinutes)} a week
          </span>
        </div>
        <GenerateButton course={course} label="Generate again" outline />
      </div>
      <div className="timetable-grid-container d-flex flex-column gap-4 flex-grow-1" style={{ minHeight: 0, maxHeight: "none" }}>
        {days.map((day) => {
          // Saved slots come back in time order within each day.
          const daySlots = course.slots.filter((slot) => slot.day === day);
          return (
            <div key={day} className="d-flex flex-column gap-2">
              <span className="font-size-lg fw-bold text-capitalize">{dayLabel(day)}</span>
              <div className="d-flex flex-row align-items-stretch gap-2 flex-wrap">
                {daySlots.map((slot, index) => (
                  <SlotCard key={slot.id} course={course} slot={slot} number={index + 1} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/** One saved slot, in the semester timetable's period card style. Slot 1 is the day's first. */
function SlotCard({ course, slot, number }) {
  const first = number === 1;
  return (
    <div
      className="card font-size-sm p-2 d-flex flex-column gap-3 border-none shadow-sm border"
      style={{ width: "49%", borderRadius: "0.85rem" }}
    >
      <div className="d-flex flex-column gap-1">
        <div className="d-flex flex-row align-items-center justify-content-between gap-2">
          <span className="fw-semibold text-truncate">{course.course?.title}</span>
          <span
            className={`rounded-pill px-2 py-1 font-size-xs fw-medium flex-shrink-0 ${
              first ? "bg-primary-50 text-primary-500" : "bg-iron-100 text-iron-500"
            }`}
            title={first ? "First slot of the day" : undefined}
          >
            Slot {number}
          </span>
        </div>
        <div className="d-flex flex-row align-items-center gap-1 text-iron-500">
          <span>{course.course?.code}</span>
          <span style={{ lineHeight: 0 }}>
            <Icon icon="bi:dot" width="16" height="16" />
          </span>
          <div className="d-flex flex-row align-items-center gap-2">
            <span style={{ lineHeight: 0 }}>
              <Icon icon="streamline-flex:city-hall" width="16" height="16" />
            </span>
            <span className="fw-normal text-truncate">{slot.hall?.name}</span>
          </div>
        </div>
      </div>
      <div className="d-flex flex-row align-items-center gap-1">
        <img src="./images/user.png" alt="" style={{ width: "1.75rem", height: "1.75rem" }} />
        <span>{slot.teacher?.name ?? course.teachers?.[0]?.name}</span>
      </div>
      <div className="d-flex flex-row align-items-center justify-content-between gap-1">
        <div className="d-flex flex-row align-items-center gap-1">
          <span style={{ lineHeight: 0 }}>
            <Icon icon="formkit:time" width="16" height="16" />
          </span>
          <span className="fw-semibold">
            {formatTime(slot.start_time)} – {formatTime(slot.end_time)}
          </span>
        </div>
        <span className="text-iron-500">{formatDuration(slot.duration_minutes)}</span>
      </div>
    </div>
  );
}

export default JointCourseWorkspace;

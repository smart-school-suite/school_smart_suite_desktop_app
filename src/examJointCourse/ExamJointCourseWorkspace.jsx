import { Icon } from "@iconify/react";
import { CalendarClock, CircleAlert, RefreshCw, Users } from "lucide-react";
import { useDispatch } from "react-redux";
import DrawerTrigger from "../components/drawer/DrawerTrigger";
import TermDropdown from "../components/JointCourseTimetable/TermDropdown";
import { formatExamDate } from "../examTimetable/constraints/fields";
import GenerateJointExamTimeDrawer from "./GenerateJointExamTimeDrawer";
import { useJointCourseKind, useJointCourseState } from "./jointCourseKinds";

/** Right side of the joint exam page: the selected joint exam and its one time. */
function ExamJointCourseWorkspace() {
  const kind = useJointCourseKind();
  const dispatch = useDispatch();
  const { term, selectedCourseId } = useJointCourseState((state) => state);
  const termsQuery = kind.hooks.useTerms();
  const { data } = kind.hooks.useTerm(term);
  const course = (data?.data?.courses ?? []).find((item) => item.id === selectedCourseId);

  return (
    <div style={{ width: "75%", height: "100%" }} className="d-flex flex-column align-items-center px-2 gap-2">
      <div className="d-flex flex-row justify-content-center w-100">
        <TermDropdown value={term} onChange={(value) => dispatch(kind.actions.setTerm(value))} termsQuery={termsQuery} text={kind.copy.term} meta={kind.copy.termMeta} />
      </div>
      {!course ? (
        <Placeholder
          text={term ? kind.copy.selectHint : kind.copy.noTermHint}
        />
      ) : (
        <CourseDetails course={course} />
      )}
    </div>
  );
}

function FindTimeButton({ course, label, outline = false }) {
  return (
    <DrawerTrigger drawerChildren={GenerateJointExamTimeDrawer} drawerData={{ course }} showHeader={false} closeOnOutsideClick={false}>
      <button
        type="button"
        className={`rounded-3 font-size-sm px-3 py-2 d-flex flex-row align-items-center gap-2 ${outline ? "bg-white border" : "border-none primary-background text-white"}`}
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
        <img src="/sss-maskot/timetable.png" alt="sss-timetable-maskot" style={{ height: "150px", width: "150px", objectFit: "contain" }} />
        <p className="mb-0 text-iron-500" style={{ maxWidth: "26rem" }}>{text}</p>
        {children}
      </div>
    </div>
  );
}

function CourseDetails({ course }) {
  const { copy, hooks } = useJointCourseKind();
  const remove = hooks.useRemove();
  const slot = course.slot;
  const missing = course.specialties_without_exam ?? [];
  const stale = (course.affected_timetables ?? []).filter((item) => item.needs_regeneration);

  return (
    <section className="w-100 d-flex flex-column gap-3 pt-2 flex-grow-1 font-size-sm" style={{ minHeight: 0, overflowY: "auto" }}>
      <div className="d-flex flex-row align-items-center justify-content-between gap-2">
        <div className="d-flex flex-column">
          <span className="fw-semibold">{course.course?.title}</span>
          <span className="text-iron-500 font-size-xs">
            {[course.course?.code, course.exam_type?.name, `${course.specialties?.length ?? 0} ${copy.sitsTogether}`].filter(Boolean).join(" · ")}
          </span>
        </div>
        {slot && <FindTimeButton course={course} label="Change time" outline />}
      </div>

      {slot ? (
        <div
          className="card p-3 d-flex flex-row align-items-center justify-content-between gap-3 bg-primary-50"
          style={{ borderRadius: "0.85rem", border: "1px solid var(--primary-color-200)", boxShadow: "inset 3px 0 0 var(--primary-color)" }}
        >
          <div className="d-flex flex-row align-items-center gap-3">
            <span className="d-inline-flex align-items-center justify-content-center rounded-3 bg-white color-primary" style={{ width: "2.5rem", height: "2.5rem" }}>
              <CalendarClock size={18} />
            </span>
            <div className="d-flex flex-column">
              <span className="fw-semibold">{formatExamDate(slot.date, "EEEE d MMMM yyyy")}</span>
              <span className="tabular-nums">
                {slot.start_time} – {slot.end_time} · {slot.duration_minutes} min
              </span>
            </div>
          </div>
          <button
            type="button"
            className="border rounded-3 bg-white px-3 py-1 font-size-sm"
            disabled={remove.isPending}
            onClick={() => remove.mutate({ examJointCourseId: course.id })}
          >
            {remove.isPending ? "Removing…" : "Remove time"}
          </button>
        </div>
      ) : (
        <Placeholder text={copy.noTime}>
          <FindTimeButton course={course} label="Find a time" />
        </Placeholder>
      )}

      {stale.length > 0 && (
        <div className="d-flex align-items-start gap-2 bg-old-lace-50 text-old-lace-700 rounded-3 p-2">
          <RefreshCw size={14} className="flex-shrink-0 mt-1" />
          <span>Generate these {copy.timetables} again so they use the new time: {stale.map((item) => item.label).join(", ")}.</span>
        </div>
      )}

      <div className="d-flex flex-column gap-2">
        <span className="fw-semibold d-inline-flex align-items-center gap-1">
          <Users size={14} /> Specialties sitting it together
        </span>
        <div className="border rounded-3 bg-white">
          {(course.specialties ?? []).map((specialty, index) => (
            <div key={specialty.exam_id} className={`d-flex flex-row justify-content-between gap-2 px-3 py-2 ${index ? "border-top" : ""}`}>
              <span>
                {specialty.label}
                {specialty.candidate_count != null && <span className="text-iron-500 font-size-xs"> · {specialty.candidate_count} candidate{specialty.candidate_count === 1 ? "" : "s"}</span>}
              </span>
              <span className="text-iron-500 font-size-xs">
                {copy.period} {formatExamDate(specialty.exam_period?.start_date)} – {formatExamDate(specialty.exam_period?.end_date)}
              </span>
            </div>
          ))}
        </div>
        {missing.length > 0 && (
          <div className="d-flex align-items-start gap-2 bg-old-lace-50 text-old-lace-700 rounded-3 p-2">
            <CircleAlert size={14} className="flex-shrink-0 mt-1" />
            <span>
              {missing.map((item) => item.label).join(", ")} {missing.length === 1 ? "takes" : "take"} this course but {missing.length === 1 ? "has" : "have"} no exam of this type yet.
              Create {missing.length === 1 ? "its exam" : "their exams"} so {missing.length === 1 ? "it is" : "they are"} included.
            </span>
          </div>
        )}
      </div>
    </section>
  );
}

export default ExamJointCourseWorkspace;

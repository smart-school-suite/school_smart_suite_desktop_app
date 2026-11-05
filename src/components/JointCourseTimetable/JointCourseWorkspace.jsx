import { Icon } from "@iconify/react";
import { Fragment, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetActiveHalls } from "../../hooks/hall/useGetActiveHall";
import { useGetJointCourseTerm } from "../../hooks/jointCourseTimetable/useGetJointCourseTerm";
import { useRecommendJointCourseSlots } from "../../hooks/jointCourseTimetable/useRecommendJointCourseSlots";
import { useSaveJointCourseSlots } from "../../hooks/jointCourseTimetable/useSaveJointCourseSlots";
import {
  setJointCourseTerm,
  setSelectedJointCourse,
} from "../../Slices/jointCourse/jointCourseTimetableSlice";
import CreateJointCourseSlotWizzard from "../../DrawerContent/JointCourseTimetable/CreateJointCourseSlot/CreateJointCourseSlotWizzard";
import { Drawer } from "../drawer/Drawer";
import RectangleSkeleton from "../SkeletonPageLoader/RectangularSkeleton";
import TermDropdown from "./TermDropdown";

const DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
const DURATIONS = [30, 60, 90, 120, 150, 180, 240];
const dayLabel = (day) => day.charAt(0).toUpperCase() + day.slice(1);
const minutes = (time) => {
  const [h, m] = String(time ?? "").split(":").map(Number);
  return Number.isFinite(h) && Number.isFinite(m) ? h * 60 + m : null;
};
const formatMinutes = (total) => {
  const h = Math.floor(total / 60);
  const m = total % 60;
  return [h ? `${h}h` : null, m ? `${m}min` : null].filter(Boolean).join(" ") || "0min";
};

let draftKey = 0;
const toDraft = (slots = []) =>
  slots.map((slot) => ({
    key: ++draftKey,
    day: slot.day,
    start_time: slot.start_time,
    end_time: slot.end_time,
    hall_id: slot.hall?.id ?? "",
    teacher_id: slot.teacher?.id ?? "",
  }));
const toPayload = (draft) =>
  draft.map(({ day, start_time, end_time, hall_id, teacher_id }) => ({
    day,
    start_time,
    end_time,
    hall_id,
    teacher_id: teacher_id || null,
  }));

function JointCourseWorkspace() {
  const dispatch = useDispatch();
  const { term, selectedCourseId } = useSelector((state) => state.jointCourseTimetable);
  const { data, isLoading, error } = useGetJointCourseTerm(term);
  const courses = data?.data?.courses ?? [];
  const course = courses.find((item) => item.id === selectedCourseId) ?? null;
  const [tab, setTab] = useState("times");
  const [wizardOpen, setWizardOpen] = useState(false);

  useEffect(() => {
    if (selectedCourseId && data && !course) dispatch(setSelectedJointCourse(null));
  }, [data, selectedCourseId]);

  const renderContent = () => {
    if (!term) {
      return (
        <StatusMessage
          title="Ready To Schedule Joint Courses ?"
          description="Select an academic year and semester from the dropdown above to get started."
        />
      );
    }
    if (isLoading) return <WorkspaceSkeleton />;
    if (error) {
      return (
        <StatusMessage
          image="./sss-maskot/error.png"
          title={error?.response?.data?.errors?.title ?? "Could Not Load Joint Courses"}
          description={error?.response?.data?.errors?.description ?? "Please try again."}
        />
      );
    }
    if (courses.length === 0) {
      return <StatusMessage title="No Joint Courses" description={data?.data?.summary?.message} />;
    }
    if (!course) {
      return (
        <div className="d-flex flex-column w-100 gap-2 flex-grow-1" style={{ minHeight: 0 }}>
          <SummaryBar summary={data?.data?.summary} />
          <WeekView courses={courses} selectedId={null} />
        </div>
      );
    }
    return (
      <div className="d-flex flex-column w-100 gap-2 flex-grow-1" style={{ minHeight: 0 }}>
        <CourseHeader course={course} onSchedule={() => setWizardOpen(true)} />
        <div className="d-flex flex-row gap-1 border-bottom">
          {[
            ["times", "Times", "lucide:clock"],
            ["week", "Week view", "lucide:calendar-days"],
          ].map(([key, label, icon]) => (
            <button
              key={key}
              type="button"
              className={`border-0 bg-transparent font-size-sm px-3 py-2 d-flex align-items-center gap-1 ${
                tab === key ? "color-primary fw-semibold" : "text-iron-500"
              }`}
              style={{ borderBottom: `2px solid ${tab === key ? "var(--primary-color)" : "transparent"}`, marginBottom: "-1px" }}
              onClick={() => setTab(key)}
            >
              <Icon icon={icon} width={14} height={14} />
              {label}
            </button>
          ))}
        </div>
        <div className="timetable-grid-container d-flex flex-column gap-3 flex-grow-1 pb-2" style={{ minHeight: 0, maxHeight: "none" }}>
          {tab === "times" ? (
            <SlotEditor key={course.id} course={course} />
          ) : (
            <WeekView courses={courses} selectedId={course.id} />
          )}
        </div>
      </div>
    );
  };

  return (
    <div style={{ width: "75%", height: "100%" }} className="d-flex flex-column align-items-center px-2 gap-2">
      <div className="d-flex flex-row justify-content-center w-100">
        <TermDropdown value={term} onChange={(value) => dispatch(setJointCourseTerm(value))} />
      </div>
      {renderContent()}
      <Drawer
        isOpen={wizardOpen && Boolean(course)}
        onClose={() => setWizardOpen(false)}
        placement="right"
        closeOnOutsideClick={false}
        showHeader={false}
      >
        {wizardOpen && course && (
          <CreateJointCourseSlotWizzard handleClose={() => setWizardOpen(false)} drawerData={course} />
        )}
      </Drawer>
    </div>
  );
}
export default JointCourseWorkspace;

function StatusMessage({ image = "./sss-maskot/timetable.png", title, description, children }) {
  return (
    <div className="d-flex flex-grow-1 align-items-center justify-content-center">
      <div className="d-flex flex-column align-items-center gap-2 text-center" style={{ maxWidth: "28rem" }}>
        <img src={image} alt="sss-timetable-maskot" style={{ height: "150px", width: "150px", objectFit: "contain" }} />
        <span className="fw-semibold font-size-sm">{title}</span>
        {description && <p className="text-muted font-size-sm mb-0">{description}</p>}
        {children}
      </div>
    </div>
  );
}

function WorkspaceSkeleton() {
  return (
    <div className="d-flex flex-column w-100 gap-2">
      <RectangleSkeleton height="8dvh" width="100%" />
      <div className="d-flex flex-row gap-2 flex-wrap">
        {[...Array(4)].map((_, index) => (
          <RectangleSkeleton key={index} height="14dvh" width="49%" />
        ))}
      </div>
    </div>
  );
}

function SummaryBar({ summary }) {
  if (!summary) return null;
  const done = summary.not_configured_count === 0;
  return (
    <div className={`d-flex align-items-center gap-2 rounded-3 p-2 font-size-sm ${done ? "bg-fern-50 text-fern-800" : "bg-old-lace-50 text-old-lace-800"}`}>
      <Icon icon={done ? "lucide:circle-check" : "lucide:info"} width={16} height={16} />
      <span>{summary.message} Pick a course on the left to set its times.</span>
    </div>
  );
}

function CourseHeader({ course, onSchedule }) {
  const stale = course.affected_timetables.filter((item) => item.needs_regeneration);
  return (
    <div className="d-flex flex-column gap-2 w-100">
      <div className="d-flex flex-row align-items-start justify-content-between gap-2">
        <div className="d-flex flex-column">
          <span className="fw-semibold font-size-md">{course.course.title}</span>
          <span className="font-size-xs text-iron-500">
            {[course.course.code, course.course.credit ? `${course.course.credit} credits` : null, course.slot_count ? `${formatMinutes(course.weekly_minutes)} a week` : null]
              .filter(Boolean)
              .join(" · ")}
          </span>
        </div>
        <div className="d-flex flex-row align-items-center gap-2 flex-shrink-0">
          <span className={`font-size-xs fw-semibold rounded-2 px-2 py-1 ${course.status === "configured" ? "bg-fern-50 text-fern-700" : "bg-iron-100 text-iron-600"}`}>
            {course.status_label}
          </span>
          <button
            type="button"
            className="border-none p-2 px-3 rounded-3 text-white primary-background font-size-sm d-flex align-items-center gap-1"
            onClick={onSchedule}
            disabled={course.teachers.length === 0}
            title={course.teachers.length === 0 ? "Assign a teacher to this course first" : "Find a free hall and times step by step"}
          >
            <Icon icon="lucide:wand-sparkles" width={14} height={14} />
            {course.status === "configured" ? "Reschedule" : "Schedule times"}
          </button>
        </div>
      </div>
      <div className="d-flex flex-row flex-wrap align-items-center gap-1 font-size-xs">
        <span className="text-iron-500 me-1">Taken by</span>
        {course.specialties.map((specialty) => (
          <span key={specialty.school_semester_id} className="bg-primary-50 color-primary rounded-2 px-2 py-1">
            {specialty.label}
          </span>
        ))}
        <span className="text-iron-500 ms-2 me-1">Teachers</span>
        {course.teachers.length === 0 ? (
          <span className="text-danger">No teacher assigned</span>
        ) : (
          course.teachers.map((teacher) => (
            <span key={teacher.id} className="bg-iron-100 rounded-2 px-2 py-1">{teacher.name}</span>
          ))
        )}
      </div>
      {stale.length > 0 && (
        <div className="d-flex align-items-start gap-2 rounded-3 p-2 font-size-sm bg-old-lace-50 text-old-lace-800">
          <Icon icon="lucide:refresh-cw" width={16} height={16} className="mt-1 flex-shrink-0" />
          <span>
            These timetables were generated before the times changed. Generate them again on the semester timetable page:{" "}
            <strong>{stale.map((item) => item.label).join(", ")}</strong>
          </span>
        </div>
      )}
    </div>
  );
}

function SlotEditor({ course }) {
  const { data: hallData } = useGetActiveHalls();
  const halls = hallData?.data ?? [];
  const { mutate: save, isPending } = useSaveJointCourseSlots();
  const [draft, setDraft] = useState(() => toDraft(course.slots));
  const [conflicts, setConflicts] = useState([]);
  const [warnings, setWarnings] = useState([]);
  const [formError, setFormError] = useState(null);

  const saved = useMemo(() => JSON.stringify(toPayload(toDraft(course.slots))), [course.slots]);
  const dirty = JSON.stringify(toPayload(draft)) !== saved;
  const invalid = draft.some(
    (row) => !row.hall_id || minutes(row.end_time) === null || minutes(row.start_time) === null || minutes(row.end_time) <= minutes(row.start_time),
  );
  const conflictRows = new Set(conflicts.map((conflict) => conflict.slot_index));

  useEffect(() => {
    setDraft(toDraft(course.slots));
  }, [saved]);

  const update = (key, patch) => {
    setDraft((rows) => rows.map((row) => (row.key === key ? { ...row, ...patch } : row)));
    setConflicts([]);
  };
  const remove = (key) => {
    setDraft((rows) => rows.filter((row) => row.key !== key));
    setConflicts([]);
  };
  const add = (row = {}) =>
    setDraft((rows) => [
      ...rows,
      {
        key: ++draftKey,
        day: "monday",
        start_time: "08:00",
        end_time: "10:00",
        hall_id: "",
        teacher_id: course.teachers[0]?.id ?? "",
        ...row,
      },
    ]);

  const handleSave = () => {
    setFormError(null);
    setConflicts([]);
    setWarnings([]);
    save(
      { semesterJointCourseId: course.id, slots: toPayload(draft) },
      {
        onSuccess: (response) => setWarnings(response?.data?.warnings ?? []),
        onError: (error) => {
          const errors = error?.response?.data?.errors;
          if (errors?.conflicts?.length) setConflicts(errors.conflicts);
          else setFormError(errors?.description ?? error?.response?.data?.message ?? "The times could not be saved.");
        },
      },
    );
  };

  return (
    <div className="d-flex flex-column gap-3 font-size-sm">
      <div className="d-flex flex-column gap-2">
        <div className="d-flex flex-row align-items-center justify-content-between">
          <span className="fw-semibold">Weekly times</span>
          <button type="button" className="border p-1 px-2 rounded-3 bg-white font-size-sm d-flex align-items-center gap-1" onClick={() => add()}>
            <Icon icon="lucide:plus" width={14} height={14} />
            Add time
          </button>
        </div>

        {draft.length === 0 ? (
          <div className="border rounded-3 p-3 text-center text-iron-500">
            No times yet. Use <strong>Schedule times</strong> above for a step-by-step setup, add one by hand, or use <strong>Find free times</strong> below.
          </div>
        ) : (
          <div className="d-flex flex-column gap-2">
            <div className="row g-2 text-iron-500 font-size-xs px-1">
              <span className="col-2">Day</span>
              <span className="col-2">Start</span>
              <span className="col-2">End</span>
              <span className="col-3">Hall</span>
              <span className="col-2">Teacher</span>
            </div>
            {draft.map((row, index) => (
              <div
                key={row.key}
                className={`row g-2 align-items-center rounded-3 p-1 ${conflictRows.has(index) ? "bg-red-50 border border-red-200" : ""}`}
              >
                <div className="col-2">
                  <select className="form-select form-select-sm" value={row.day} onChange={(e) => update(row.key, { day: e.target.value })}>
                    {DAYS.map((day) => (
                      <option key={day} value={day}>{dayLabel(day)}</option>
                    ))}
                  </select>
                </div>
                <div className="col-2">
                  <input type="time" className="form-control form-control-sm" value={row.start_time} onChange={(e) => update(row.key, { start_time: e.target.value })} />
                </div>
                <div className="col-2">
                  <input type="time" className="form-control form-control-sm" value={row.end_time} onChange={(e) => update(row.key, { end_time: e.target.value })} />
                </div>
                <div className="col-3">
                  <select className="form-select form-select-sm" value={row.hall_id} onChange={(e) => update(row.key, { hall_id: e.target.value })}>
                    <option value="">Choose a hall</option>
                    {halls.map((hall) => (
                      <option key={hall.id} value={hall.id}>{hall.name}</option>
                    ))}
                  </select>
                </div>
                <div className="col-2">
                  <select className="form-select form-select-sm" value={row.teacher_id} onChange={(e) => update(row.key, { teacher_id: e.target.value })}>
                    {course.teachers.map((teacher) => (
                      <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
                    ))}
                  </select>
                </div>
                <div className="col-1 d-flex justify-content-end">
                  <button type="button" className="border-none bg-transparent text-iron-500 hover-text-danger" onClick={() => remove(row.key)} aria-label="Remove time">
                    <Icon icon="lucide:trash-2" width={16} height={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {conflicts.length > 0 && (
          <div className="rounded-3 p-2 bg-red-50 text-red-800 d-flex flex-column gap-1">
            <span className="fw-semibold">These times clash with other lessons</span>
            {conflicts.map((conflict, index) => (
              <span key={index}>• {conflict.message}</span>
            ))}
          </div>
        )}
        {formError && <div className="rounded-3 p-2 bg-red-50 text-red-800">{formError}</div>}
        {warnings.length > 0 && (
          <div className="rounded-3 p-2 bg-old-lace-50 text-old-lace-800 d-flex flex-column gap-1">
            <span className="fw-semibold">Saved. Some timetables now need to be generated again</span>
            {warnings.map((warning, index) => (
              <span key={index}>• {warning.message}</span>
            ))}
          </div>
        )}

        <div className="d-flex flex-row justify-content-end gap-2">
          <button type="button" className="border p-2 px-3 rounded-3 bg-white font-size-sm" disabled={!dirty || isPending} onClick={() => { setDraft(toDraft(course.slots)); setConflicts([]); setFormError(null); }}>
            Reset
          </button>
          <button type="button" className="border-none p-2 px-3 rounded-3 text-white primary-background font-size-sm" disabled={!dirty || invalid || isPending} onClick={handleSave}>
            {isPending ? "Saving..." : "Save times"}
          </button>
        </div>
      </div>

      <FreeTimeFinder course={course} halls={halls} onPick={add} />
    </div>
  );
}

function FreeTimeFinder({ course, halls, onPick }) {
  const { mutate: recommend, data, isPending, error, reset } = useRecommendJointCourseSlots();
  const [day, setDay] = useState("monday");
  const [duration, setDuration] = useState(120);
  const [hallId, setHallId] = useState("");
  const [showBusy, setShowBusy] = useState(false);
  const result = data?.data;

  const find = () =>
    recommend({
      semesterJointCourseId: course.id,
      payload: { day, duration_minutes: duration, hall_id: hallId || null },
    });

  return (
    <div className="border rounded-3 p-2 d-flex flex-column gap-2">
      <div className="d-flex flex-column">
        <span className="fw-semibold">Find free times</span>
        <span className="font-size-xs text-iron-500">
          Shows times when a teacher of the course, the hall and every linked specialty are free.
        </span>
      </div>
      <div className="row g-2 align-items-end">
        <div className="col-3">
          <label className="font-size-xs text-iron-500">Day</label>
          <select className="form-select form-select-sm" value={day} onChange={(e) => { setDay(e.target.value); reset(); }}>
            {DAYS.map((item) => (
              <option key={item} value={item}>{dayLabel(item)}</option>
            ))}
          </select>
        </div>
        <div className="col-3">
          <label className="font-size-xs text-iron-500">Duration</label>
          <select className="form-select form-select-sm" value={duration} onChange={(e) => { setDuration(Number(e.target.value)); reset(); }}>
            {DURATIONS.map((item) => (
              <option key={item} value={item}>{formatMinutes(item)}</option>
            ))}
          </select>
        </div>
        <div className="col-4">
          <label className="font-size-xs text-iron-500">Hall (optional)</label>
          <select className="form-select form-select-sm" value={hallId} onChange={(e) => { setHallId(e.target.value); reset(); }}>
            <option value="">Any hall</option>
            {halls.map((hall) => (
              <option key={hall.id} value={hall.id}>{hall.name}</option>
            ))}
          </select>
        </div>
        <div className="col-2">
          <button type="button" className="w-100 border-none p-1 rounded-3 text-white primary-background font-size-sm" style={{ height: "31px" }} disabled={isPending || course.teachers.length === 0} onClick={find}>
            {isPending ? "Finding…" : "Find"}
          </button>
        </div>
      </div>

      {error && (
        <span className="text-danger">
          {error?.response?.data?.errors?.description ?? "Could not find free times."}
        </span>
      )}
      {result && (
        <div className="d-flex flex-column gap-2">
          <span className="text-iron-600">{result.summary.message}</span>
          <div className="d-flex flex-row flex-wrap gap-2">
            {result.recommended.map((slot) => (
              <button
                key={slot.start_time}
                type="button"
                className="border rounded-3 bg-white px-2 py-1 font-size-sm hover-bg-primary-50 hover-border-primary-300 d-flex flex-column align-items-start"
                title="Add this time"
                onClick={() =>
                  onPick({
                    day: result.day,
                    start_time: slot.start_time,
                    end_time: slot.end_time,
                    hall_id: slot.hall?.id ?? "",
                    teacher_id: slot.teachers[0]?.id ?? course.teachers[0]?.id ?? "",
                  })
                }
              >
                <span className="fw-semibold d-flex align-items-center gap-1">
                  <Icon icon="lucide:plus" width={12} height={12} />
                  {slot.time}
                </span>
                <span className="font-size-xs text-iron-500">{slot.teachers.map((teacher) => teacher.name).join(", ")}</span>
              </button>
            ))}
          </div>
          {result.unavailable.length > 0 && (
            <div className="d-flex flex-column gap-1">
              <button type="button" className="border-none bg-transparent p-0 text-start text-iron-500 font-size-xs d-flex align-items-center gap-1" onClick={() => setShowBusy((value) => !value)}>
                <Icon icon={showBusy ? "lucide:chevron-up" : "lucide:chevron-down"} width={12} height={12} />
                {result.unavailable.length} busy time(s)
              </button>
              {showBusy &&
                result.unavailable.map((slot) => (
                  <div key={slot.start_time} className="font-size-xs text-iron-600">
                    <strong>{slot.time}</strong>: {slot.reasons.join("; ")}
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function WeekView({ courses, selectedId }) {
  const dispatch = useDispatch();
  const days = useMemo(() => {
    const byDay = Object.fromEntries(DAYS.map((day) => [day, []]));
    courses.forEach((course) =>
      course.slots.forEach((slot) => byDay[slot.day]?.push({ ...slot, course })),
    );
    return DAYS.map((day) => ({
      day,
      slots: byDay[day].sort((a, b) => minutes(a.start_time) - minutes(b.start_time)),
    })).filter((item) => item.slots.length > 0);
  }, [courses]);

  const missing = courses.filter((course) => course.status !== "configured");

  return (
    <div className="d-flex flex-column gap-3 w-100 font-size-sm" style={{ overflowY: "auto" }}>
      {days.length === 0 ? (
        <div className="border rounded-3 p-3 text-center text-iron-500">No joint course has a time yet.</div>
      ) : (
        days.map(({ day, slots }) => (
          <div key={day} className="d-flex flex-column gap-2">
            <span className="font-size-lg fw-bold">{dayLabel(day)}</span>
            <div className="d-flex flex-row align-items-stretch gap-2 flex-wrap">
              {slots.map((slot) => (
                <Fragment key={slot.id}>
                  <button
                    type="button"
                    className={`card text-start font-size-sm p-2 d-flex flex-column gap-2 shadow-sm ${slot.course.id === selectedId ? "border-primary" : "border"}`}
                    style={{ width: "49%", borderRadius: "0.85rem", borderWidth: slot.course.id === selectedId ? "2px" : undefined }}
                    onClick={() => dispatch(setSelectedJointCourse(slot.course.id))}
                  >
                    <div className="d-flex flex-row justify-content-between w-100 gap-2">
                      <span className="fw-semibold">{slot.course.course.title}</span>
                      <span className="fw-semibold d-flex align-items-center gap-1 flex-shrink-0">
                        <Icon icon="formkit:time" width="14" height="14" />
                        {slot.time}
                      </span>
                    </div>
                    <div className="d-flex flex-row align-items-center gap-2 text-iron-500">
                      <span className="d-flex align-items-center gap-1">
                        <Icon icon="streamline-flex:city-hall" width="14" height="14" />
                        {slot.hall.name}
                      </span>
                      <Icon icon="bi:dot" width="14" height="14" />
                      <span>{slot.teacher.name}</span>
                    </div>
                    <span className="font-size-xs text-iron-500 text-truncate w-100">
                      {slot.course.specialties.map((specialty) => specialty.label).join(", ")}
                    </span>
                  </button>
                </Fragment>
              ))}
            </div>
          </div>
        ))
      )}
      {missing.length > 0 && (
        <div className="d-flex flex-column gap-1">
          <span className="fw-semibold">Still without a time</span>
          <div className="d-flex flex-row flex-wrap gap-2">
            {missing.map((course) => (
              <button key={course.id} type="button" className="border rounded-3 bg-white px-2 py-1 font-size-sm hover-bg-iron-50" onClick={() => dispatch(setSelectedJointCourse(course.id))}>
                {course.course.title}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

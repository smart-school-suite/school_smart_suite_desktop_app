import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
import {
  EmptyState,
  IconButton,
  Note,
  Section,
  TextButton,
} from "../../components/SemesterTimetable/ConstraintWizard/WizardPrimitives";
import { fromMinutes, toMinutes } from "../../utils/examTimetable/buildRequest";
import { makeExamConstraintEditor } from "./ExamConstraintWizard";
import { EntitySelect, ExamDateSelect, formatExamDate, MultiPicker, SetupNotice, TimeInput, TimeRange, useExamSetup } from "./fields";
import { useKindState, useTimetableKind } from "../TimetableKindContext";

/** Exam length of a course from the session duration constraint. */
const courseDuration = (constraints, courseId) => {
  const duration = constraints.session_duration;
  const exception = (duration.course_exceptions ?? []).find((item) => item.course_id === courseId);
  return Number(exception?.duration ?? duration.duration) || 120;
};

const endFor = (start, minutes) => (toMinutes(start) === null ? null : fromMinutes(toMinutes(start) + minutes));

/**
 * One editor for every request list. `config` says which resource a row is
 * about (course, hall or invigilator) and whether it names halls and
 * invigilators (a requested assignment).
 */
function makeRequestEditor(config) {
  function Configure({ setup }) {
    const kind = useTimetableKind();
    const dispatch = useDispatch();
    const constraints = useKindState((state) => state.constraints);
    const rows = constraints[config.key] ?? [];
    const update = (id, patch) => dispatch(kind.actions.updateRequest({ key: config.key, id, patch }));

    const options = {
      course_id: setup.courses.map((course) => ({ value: course.course_id, label: course.course_title, disabled: course.is_joint, joint: course.is_joint })),
      hall_id: setup.halls.map((hall) => ({ value: hall.hall_id, label: `${hall.hall_name} (${hall.capacity} seats)` })),
      invigilator_id: setup.invigilators.map((person) => ({ value: person.invigilator_id, label: person.name ?? "Invigilator" })),
    }[config.field];

    const addRow = () =>
      dispatch(
        kind.actions.addRequest({
          key: config.key,
          entry: {
            [config.field]: null,
            date: null,
            start_time: "08:00",
            end_time: config.field === "course_id" ? endFor("08:00", Number(constraints.session_duration.duration) || 120) : "10:00",
            ...(config.assignment && { hall_ids: [], invigilator_ids: [] }),
          },
        }),
      );

    return (
      <>
        <SetupNotice {...setup} />
        {config.field === "course_id" && setup.courses.some((course) => course.is_joint) && (
          <Note>{kind.joint.requestNote}</Note>
        )}
        <Section
          label={config.listLabel}
          action={
            <TextButton icon="lucide:plus" onClick={addRow}>
              Add request
            </TextButton>
          }
        >
          {rows.length === 0 ? (
            <EmptyState icon="lucide:calendar-plus" title="No requests yet" text={config.emptyText} />
          ) : (
            rows.map((row) => {
              const isCourse = config.field === "course_id";
              const minutes = isCourse && row.course_id ? courseDuration(constraints, row.course_id) : null;
              const teachers = new Set(
                setup.invigilators.filter((person) => (person.courses_taught ?? []).includes(row.course_id)).map((person) => person.invigilator_id),
              );

              return (
                <div key={row.id} className="cw-panel d-flex flex-column gap-2 mb-2">
                  <div className="d-flex flex-row align-items-center gap-2">
                    <EntitySelect
                      value={row[config.field]}
                      placeholder={config.placeholder}
                      options={options.filter((option) => !option.joint)}
                      onChange={(value) => {
                        const patch = { [config.field]: value };
                        if (isCourse && value) patch.end_time = endFor(row.start_time, courseDuration(constraints, value));
                        if (config.assignment) patch.invigilator_ids = (row.invigilator_ids ?? []).filter((id) => !setup.invigilators.find((p) => p.invigilator_id === id)?.courses_taught?.includes(value));
                        update(row.id, patch);
                      }}
                    />
                    <IconButton icon="lucide:trash-2" label="Remove request" tone="danger" onClick={() => dispatch(kind.actions.removeRequest({ key: config.key, id: row.id }))} />
                  </div>
                  <ExamDateSelect value={row.date} dates={setup.dates} onChange={(date) => update(row.id, { date })} />
                  {isCourse ? (
                    <div className="d-flex flex-row align-items-start gap-3">
                      <div style={{ width: "10rem" }}>
                        <span className="font-size-xs text-iron-500">Starts at</span>
                        <TimeInput
                          value={row.start_time}
                          onChange={(value) =>
                            update(row.id, { start_time: value, end_time: endFor(value, minutes ?? (Number(constraints.session_duration.duration) || 120)) })
                          }
                        />
                      </div>
                      <div className="d-flex flex-column">
                        <span className="font-size-xs text-iron-500">Ends at</span>
                        <span className="fw-semibold tabular-nums" style={{ lineHeight: "2.4rem" }}>{row.end_time ?? "—"}</span>
                      </div>
                      {minutes && <span className="font-size-xs text-iron-500 mt-4">This exam lasts {minutes} minutes.</span>}
                    </div>
                  ) : (
                    <TimeRange
                      start={row.start_time}
                      end={row.end_time}
                      onStart={(value) => update(row.id, { start_time: value })}
                      onEnd={(value) => update(row.id, { end_time: value })}
                    />
                  )}
                  {config.assignment && (
                    <>
                      <div className="d-flex flex-column gap-1">
                        <span className="font-size-xs fw-medium">Halls (optional)</span>
                        <MultiPicker
                          placeholder="The scheduler chooses"
                          options={setup.halls.map((hall) => ({ value: hall.hall_id, label: `${hall.hall_name} · ${hall.capacity} seats` }))}
                          values={row.hall_ids ?? []}
                          onChange={(hallIds) => update(row.id, { hall_ids: hallIds })}
                        />
                      </div>
                      <div className="d-flex flex-column gap-1">
                        <span className="font-size-xs fw-medium">Invigilators (optional)</span>
                        <MultiPicker
                          key={`${row.id}-${row.course_id}`}
                          placeholder="The scheduler chooses"
                          // A course's own teachers are never offered as its invigilators.
                          options={setup.invigilators
                            .filter((person) => !teachers.has(person.invigilator_id))
                            .map((person) => ({ value: person.invigilator_id, label: person.name ?? "Invigilator" }))}
                          values={row.invigilator_ids ?? []}
                          onChange={(invigilatorIds) => update(row.id, { invigilator_ids: invigilatorIds })}
                        />
                        {teachers.size > 0 && (
                          <span className="font-size-xs text-iron-500">
                            Not offered because they teach this course:{" "}
                            {setup.invigilators.filter((person) => teachers.has(person.invigilator_id)).map((person) => person.name).join(", ")}
                          </span>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })
          )}
        </Section>
      </>
    );
  }

  return makeExamConstraintEditor({
    configureTitle: config.title,
    configureDescription: config.description,
    points: config.points,
    emptyText: config.emptyText,
    Configure,
    summary: (constraints, setup) => {
      const names = {
        course_id: (id) => setup.courses.find((item) => item.course_id === id)?.course_title,
        hall_id: (id) => setup.halls.find((item) => item.hall_id === id)?.hall_name,
        invigilator_id: (id) => setup.invigilators.find((item) => item.invigilator_id === id)?.name,
      }[config.field];
      return (constraints[config.key] ?? []).map((row) => ({
        label: names(row[config.field]) ?? `No ${config.placeholder.toLowerCase()} chosen`,
        value: row.date ? `${formatExamDate(row.date)} · ${row.start_time} – ${row.end_time}` : "No date chosen",
      }));
    },
  });
}

export const CourseRequestedSlotEditor = makeRequestEditor({
  key: "course_requested_slot",
  field: "course_id",
  placeholder: "Course",
  title: "Requested exam times",
  listLabel: "Courses at a fixed time",
  description: "Put a course's exam at a date and time you choose.",
  emptyText: "Every course's exam is placed by the scheduler.",
  points: [
    { title: "Placed first", text: "Requested times are placed before the other exams." },
    { title: "Checked", text: "A request that clashes or has no free hall or invigilator is reported with solutions." },
  ],
});

export const RequestedAssignmentEditor = makeRequestEditor({
  key: "requested_assignment",
  field: "course_id",
  assignment: true,
  placeholder: "Course",
  title: "Requested assignments",
  listLabel: "Courses with a fixed time, halls and invigilators",
  description: "Choose the time, and optionally the halls and invigilators, of a course's exam.",
  emptyText: "No exam has a fixed assignment.",
  points: [
    { title: "Exact assignment", text: "The exam uses the halls and invigilators you name; missing seats or invigilators are added." },
    { title: "No own-course invigilation", text: "Teachers of the course can't be picked as its invigilators." },
  ],
});

export const HallRequestedSlotEditor = makeRequestEditor({
  key: "hall_requested_slot",
  field: "hall_id",
  placeholder: "Hall",
  title: "Hall requests",
  listLabel: "Halls to use at a time",
  description: "Ask for a hall to be used by the exam taking place at a time.",
  emptyText: "Halls are chosen by the scheduler.",
  points: [
    { title: "A preference", text: "The exam at that time uses the hall first, when it is free." },
    { title: "Needs an exam then", text: "If no exam takes place at that time, the request is reported." },
  ],
});

export const InvigilatorRequestedSlotEditor = makeRequestEditor({
  key: "invigilator_requested_slot",
  field: "invigilator_id",
  placeholder: "Invigilator",
  title: "Invigilator requests",
  listLabel: "Invigilators to use at a time",
  description: "Ask for someone to invigilate the exam taking place at a time.",
  emptyText: "Invigilators are chosen by the scheduler.",
  points: [
    { title: "A preference", text: "They are picked first for the exam at that time." },
    { title: "Never their own course", text: "A teacher is never given the exam of a course they teach." },
  ],
});


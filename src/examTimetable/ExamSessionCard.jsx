import { Icon } from "@iconify/react";
import { Users } from "lucide-react";

const SOURCE_LABELS = {
  course_requested_slot: "Requested time",
  requested_assignment: "Requested assignment",
};

/**
 * One exam in the generated exam timetable, in the semester timetable's
 * period card style. Joint exams (shared with other specialties, fixed
 * before generation) get a tinted card and a badge.
 */
function ExamSessionCard({ slot }) {
  const joint = slot?.slot_type === "joint";
  const halls = slot?.halls ?? [];
  const invigilators = halls.flatMap((hall) => hall.invigilators ?? []);
  const sourceLabel = SOURCE_LABELS[slot?.source];

  return (
    <div
      className={`card font-size-sm p-2 d-flex flex-column gap-3 shadow-sm ${joint ? "bg-primary-50" : "border-none border"}`}
      style={{
        width: "49%",
        borderRadius: "0.85rem",
        ...(joint && { border: "1px solid var(--primary-color-200)", boxShadow: "inset 3px 0 0 var(--primary-color)" }),
      }}
    >
      <div className="d-flex flex-column gap-1">
        <div className="d-flex flex-row align-items-start justify-content-between gap-2">
          <span className="fw-semibold">{slot?.course_title ?? "Course"}</span>
          <div className="d-flex flex-row gap-1 flex-shrink-0">
            {joint && (
              <span
                className="d-inline-flex align-items-center gap-1 rounded-pill px-2 font-size-xs text-nowrap bg-white text-primary-700"
                style={{ border: "1px solid var(--primary-color-200)" }}
                title="Shared with other specialties. Its time is set on the Joint Course Timetable page."
              >
                <Users size={11} /> Joint exam
              </span>
            )}
            {sourceLabel && <span className="rounded-pill px-2 font-size-xs text-nowrap bg-iron-100 text-iron-600">{sourceLabel}</span>}
          </div>
        </div>
        <div className="d-flex flex-row align-items-center gap-1 text-iron-500">
          {slot?.course_code && <span>{slot.course_code}</span>}
          {slot?.course_code && (
            <span style={{ lineHeight: 0 }}>
              <Icon icon="bi:dot" width="16" height="16" />
            </span>
          )}
          <span className="d-inline-flex align-items-center gap-1">
            <Icon icon="lucide:users" width="14" height="14" /> {slot?.candidate_count} candidates
          </span>
        </div>
      </div>

      <div className="d-flex flex-column gap-1">
        {halls.map((hall) => (
          <div key={hall.hall_id} className="d-flex flex-row align-items-center justify-content-between gap-2">
            <span className="d-inline-flex align-items-center gap-2 text-truncate">
              <span style={{ lineHeight: 0 }}>
                <Icon icon="streamline-flex:city-hall" width="16" height="16" />
              </span>
              <span className="text-truncate">{hall.hall_name}</span>
              {hall.shared && <span className="font-size-xs text-iron-500">(shared)</span>}
            </span>
            <span className="font-size-xs text-iron-500 text-nowrap tabular-nums">
              {hall.candidate_count}/{hall.capacity} seats
            </span>
          </div>
        ))}
      </div>

      <div className="d-flex flex-row align-items-center gap-1 flex-wrap" title="Invigilators never invigilate a course they teach.">
        <img src="./images/user.png" alt="" style={{ width: "1.75rem", height: "1.75rem" }} />
        <span className="text-truncate">
          {invigilators.length ? invigilators.map((person) => person.name ?? "Invigilator").join(", ") : "No invigilator"}
        </span>
      </div>

      <div className="d-flex flex-row align-items-center justify-content-between gap-1">
        <div className="d-flex flex-row align-items-center gap-1">
          <span style={{ lineHeight: 0 }}>
            <Icon icon="formkit:time" width="16" height="16" />
          </span>
          <span className="fw-semibold tabular-nums">
            {slot?.start_time} – {slot?.end_time}
          </span>
        </div>
        <span className="font-size-xs text-iron-500">{slot?.duration_minutes} min</span>
      </div>
    </div>
  );
}

export default ExamSessionCard;

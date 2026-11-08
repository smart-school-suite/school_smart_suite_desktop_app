import { Icon } from "@iconify/react";
import { Users } from "lucide-react";
import { isJointSlot } from "../../utils/semesterTimetable/timetableSlots";

// One lesson in the generated semester timetable. Joint courses (shared with
// other specialties and fixed before generation) get a tinted card, a badge
// and the specialties they are shared with.
// Also used to preview joint course slots before they are saved:
// `action` sits in the top-right corner, `children` at the bottom.
function PeriodCard({ slot, action = null, children = null, style }) {
  const joint = isJointSlot(slot);
  // Bootstrap's .border sets the colour with !important, so leave it off when
  // the caller draws its own border (e.g. a red conflict outline).
  const ownBorder = Boolean(style?.border);
  const sharedWith = slot?.joint_course?.shared_with ?? [];
  const sharedLabels = sharedWith.map((specialty) => specialty.label);

  return (
    <div
      className={`card font-size-sm p-2 d-flex flex-column gap-3 shadow-sm ${joint ? "bg-primary-50" : ownBorder ? "" : "border-none border"}`}
      style={{
        width: "49%",
        borderRadius: "0.85rem",
        ...(joint && {
          border: "1px solid var(--primary-color-200)",
          boxShadow: "inset 3px 0 0 var(--primary-color)",
        }),
        ...style,
      }}
    >
      <div className="d-flex flex-column gap-1">
        <div className="d-flex flex-row align-items-start justify-content-between gap-2">
          <span className="fw-semibold">{slot?.course_name}</span>
          <div className="d-flex flex-row align-items-center gap-1 flex-shrink-0">
            {joint && (
              <span
                className="d-inline-flex align-items-center gap-1 rounded-pill px-2 font-size-xs text-nowrap bg-white text-primary-700"
                style={{ border: "1px solid var(--primary-color-200)" }}
                title="Shared with other specialties. Its time is set on the joint course timetable page."
              >
                <Users size={11} /> Joint course
              </span>
            )}
            {action}
          </div>
        </div>
        <div className="d-flex flex-row align-items-center gap-1 text-iron-500">
          <div className="d-flex flex-row align-items-center gap-2">
            <span style={{ lineHeight: 0 }}>
              <Icon icon="streamline-flex:city-hall" width="16" height="16" />
            </span>
            <span className="fw-normal text-iron-500">{slot?.hall_name}</span>
          </div>
          {slot?.hall_location && (
            <>
              <span style={{ lineHeight: 0 }}>
                <Icon icon="bi:dot" width="16" height="16" />
              </span>
              <div className="d-flex flex-row align-items-center gap-2">
                <span style={{ lineHeight: 0 }}>
                  <Icon icon="iconamoon:location-light" width="16" height="16" />
                </span>
                <span className="fw-normal">{slot?.hall_location}</span>
              </div>
            </>
          )}
        </div>
        {joint && (
          <span
            className="font-size-xs text-primary-700 text-truncate"
            title={sharedLabels.join("\n") || undefined}
          >
            {sharedLabels.length
              ? `Shared with ${sharedLabels.join(", ")}`
              : "Shared with other specialties"}
          </span>
        )}
      </div>
      <div className="d-flex flex-row align-items-center gap-1">
        <div>
          <img
            src="./images/user.png"
            alt="user-image"
            style={{
              width: "1.75rem",
              height: "1.75rem",
            }}
          />
        </div>
        <span>{slot?.teacher_name}</span>
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
        {joint && slot?.period_count > 1 && (
          <span className="font-size-xs text-iron-500">
            {slot.period_count} periods
          </span>
        )}
      </div>
      {children}
    </div>
  );
}
export default PeriodCard;

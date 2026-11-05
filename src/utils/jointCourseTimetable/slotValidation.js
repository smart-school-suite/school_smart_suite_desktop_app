import {
  dayLabel,
  formatDuration,
  formatTime,
  isCompleteTime,
  toMinutes,
} from "../semesterTimetable/timeUtils";
import { slotDuration, slotNumber } from "./slotDraft";

// Mirrors SaveJointCourseSlotsRequest / RecommendJointCourseSlotsRequest on the API.
export const MIN_SLOT_MINUTES = 15;
export const MAX_SLOT_MINUTES = 480;
export const MAX_SLOTS_PER_COURSE = 20;

export const SLOT_STATUS = {
  INCOMPLETE: "incomplete",
  INVALID: "invalid",
  CHECKING: "checking",
  CONFLICT: "conflict",
  UNVERIFIED: "unverified",
  READY: "ready",
};

const overlaps = (a, b) =>
  toMinutes(a.start_time) < toMinutes(b.end_time) &&
  toMinutes(b.start_time) < toMinutes(a.end_time);

export const timeLabel = (slot) =>
  `${formatTime(slot.start_time)} – ${formatTime(slot.end_time)}`;

export const slotName = (slots, slot) =>
  `${dayLabel(slot.day)} slot ${slotNumber(slots, slot)}`;

/**
 * Checks that need no server: required fields, time order, the API's duration
 * limits, period alignment (advice only) and overlaps between this course's
 * own slots. Returns { errors, warnings }, each [{ type, message }].
 */
export const validateSlot = (slot, slots, periodMinutes) => {
  const errors = [];
  const warnings = [];
  const hasStart = isCompleteTime(slot.start_time);
  const hasEnd = isCompleteTime(slot.end_time);

  if (!hasStart) errors.push({ type: "missing_start", message: "Set a start time." });
  if (!hasEnd) errors.push({ type: "missing_end", message: "Set an end time." });
  if (!slot.hall_id) errors.push({ type: "missing_hall", message: "Choose a hall." });

  if (hasStart && hasEnd) {
    const minutes = toMinutes(slot.end_time) - toMinutes(slot.start_time);
    if (minutes <= 0) {
      errors.push({
        type: "time_order",
        message: "The end time must be after the start time.",
      });
    } else if (minutes < MIN_SLOT_MINUTES || minutes > MAX_SLOT_MINUTES) {
      errors.push({
        type: "duration",
        message: `A slot must last between ${MIN_SLOT_MINUTES} minutes and ${MAX_SLOT_MINUTES / 60} hours. This one lasts ${formatDuration(minutes)}.`,
      });
    } else if (periodMinutes && minutes % periodMinutes !== 0) {
      warnings.push({
        type: "alignment",
        message: `${formatDuration(minutes)} is not a whole number of ${periodMinutes}-minute periods.`,
      });
    }

    slots
      .filter(
        (other) =>
          other.id !== slot.id &&
          other.day === slot.day &&
          slotDuration(other) !== null &&
          minutes > 0,
      )
      .filter((other) => overlaps(slot, other))
      .forEach((other) =>
        errors.push({
          type: "overlap",
          message: `Overlaps ${slotName(slots, other)} (${timeLabel(other)}).`,
        }),
      );
  }

  return { errors, warnings };
};

/** True when the slot can be sent to the server for an availability check. */
export const isCheckable = (local) => local.errors.length === 0;

/**
 * Combine local checks with the server availability check into one status.
 * `check` is { status: "idle"|"checking"|"available"|"conflict"|"error", reasons }.
 */
export const slotStatus = (local, check) => {
  if (local.errors.some((error) => error.type.startsWith("missing"))) {
    return SLOT_STATUS.INCOMPLETE;
  }
  if (local.errors.length) return SLOT_STATUS.INVALID;
  if (!check || check.status === "checking") return SLOT_STATUS.CHECKING;
  if (check.status === "conflict") return SLOT_STATUS.CONFLICT;
  if (check.status === "error") return SLOT_STATUS.UNVERIFIED;
  return SLOT_STATUS.READY;
};

export const STATUS_META = {
  [SLOT_STATUS.INCOMPLETE]: { label: "Incomplete", tone: "muted" },
  [SLOT_STATUS.INVALID]: { label: "Needs attention", tone: "danger" },
  [SLOT_STATUS.CHECKING]: { label: "Checking…", tone: "neutral" },
  [SLOT_STATUS.CONFLICT]: { label: "Conflict", tone: "danger" },
  [SLOT_STATUS.UNVERIFIED]: { label: "Not checked", tone: "warn" },
  [SLOT_STATUS.READY]: { label: "Available", tone: "success" },
};

/** A slot blocks saving unless it is ready (or could not be pre-checked; the save revalidates). */
export const blocksSave = (status) =>
  ![SLOT_STATUS.READY, SLOT_STATUS.UNVERIFIED].includes(status);

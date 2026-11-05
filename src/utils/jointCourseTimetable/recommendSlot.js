import {
  getJointCourseHallAvailability,
  getJointCourseRecommendedSlots,
} from "../../services/jointCourseTimetable";
import { dayLabel, formatDuration, toMinutes } from "../semesterTimetable/timeUtils";

/*
 * Builds slot recommendations from the existing API. The server knows lecturer,
 * hall and timetable availability but not the unsaved slots in this drawer, so
 * times that overlap those are dropped here. Nothing is applied: the caller
 * shows the options and the administrator accepts one explicitly.
 */

const HALLS_TO_TRY = 3;
const TIMES_PER_HALL = 3;

const overlaps = (a, b) =>
  toMinutes(a.start_time) < toMinutes(b.end_time) &&
  toMinutes(b.start_time) < toMinutes(a.end_time);

/** Server errors arrive as { errors: { title, description } }. */
export const describeError = (error, fallback) =>
  error?.response?.data?.errors?.description ??
  error?.response?.data?.message ??
  fallback;

const explain = ({ hall, mostFree, day, minutes, lecturerName }) => {
  const reasons = [
    `${lecturerName ?? "The lecturer"} and ${hall.name} are both free`,
    "no clash with other timetables or this course's other slots",
  ];
  if (hall.capacity) reasons.push(`seats ${hall.capacity}`);
  const lead =
    hall.free_count === mostFree
      ? `${hall.name} has the most free ${formatDuration(minutes)} times on ${dayLabel(day)} (${hall.free_count}).`
      : `${hall.name} has ${hall.free_count} free ${formatDuration(minutes)} time(s) on ${dayLabel(day)}.`;
  return `${lead} ${reasons.join(", ")}.`.replace(/^\w/, (c) => c.toUpperCase());
};

/**
 * @param {object} args
 * @param {string} args.courseId        semester joint course id
 * @param {string} args.teacherId       assigned lecturer
 * @param {string} args.lecturerName
 * @param {string} args.day
 * @param {number} args.minutes         slot length to look for
 * @param {Array}  args.reserved        [{ day, start_time, end_time }] to avoid
 * @param {string} [args.preferredHallId] tried first when it has free times
 * @returns {Promise<{ options: Array, message: string }>}
 */
export async function findSlotOptions({
  courseId,
  teacherId,
  lecturerName,
  day,
  minutes,
  reserved = [],
  preferredHallId,
}) {
  const availability = await getJointCourseHallAvailability(courseId, {
    duration_minutes: minutes,
    days: [day],
    ...(teacherId ? { teacher_id: teacherId } : {}),
  });
  const halls = (availability?.data?.halls ?? []).filter((hall) => hall.free_count > 0);
  if (halls.length === 0) {
    return {
      options: [],
      message:
        availability?.data?.summary?.message ??
        `No hall is free for ${formatDuration(minutes)} on ${dayLabel(day)}.`,
    };
  }

  const ranked = [
    ...halls.filter((hall) => hall.id === preferredHallId),
    ...halls.filter((hall) => hall.id !== preferredHallId),
  ].slice(0, HALLS_TO_TRY);

  const perHall = await Promise.all(
    ranked.map((hall) =>
      getJointCourseRecommendedSlots(courseId, {
        day,
        duration_minutes: minutes,
        hall_id: hall.id,
        ...(teacherId ? { teacher_id: teacherId } : {}),
      }),
    ),
  );

  const mostFree = Math.max(...halls.map((hall) => hall.free_count));
  const sameDay = reserved.filter((slot) => slot.day === day);
  const options = ranked.flatMap((hall, rank) =>
    (perHall[rank]?.data?.recommended ?? [])
      .filter((time) => !sameDay.some((slot) => overlaps(time, slot)))
      .slice(0, TIMES_PER_HALL)
      .map((time) => ({
        key: `${hall.id}-${time.start_time}`,
        day,
        start_time: time.start_time,
        end_time: time.end_time,
        hall_id: hall.id,
        hall_name: hall.name,
        hall_capacity: hall.capacity,
        hall_location: hall.location,
        explanation: explain({ hall, mostFree, day, minutes, lecturerName }),
      })),
  );

  return {
    options,
    message: options.length
      ? `${options.length} option(s) on ${dayLabel(day)}.`
      : `Every free time on ${dayLabel(day)} overlaps another slot of this course. Try another day or change that slot.`,
  };
}

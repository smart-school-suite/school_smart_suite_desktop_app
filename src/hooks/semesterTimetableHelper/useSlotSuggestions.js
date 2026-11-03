import { useQuery } from "@tanstack/react-query";
import {
  generateSlots,
  getCoursesSchoolSemesterId,
  getRecommendedSlots,
} from "../../services/semesterTimetableHelpers";

const FIVE_MINUTES = 5 * 60 * 1000;

/**
 * Recommended free slots from the API. Enabled once a day, a period length
 * and a teacher or course are known; cached per combination.
 */
export const useRecommendedSlots = (payload, { enabled = true } = {}) =>
  useQuery({
    queryKey: ["semester-timetable-recommended-slots", payload],
    queryFn: () => getRecommendedSlots(payload),
    enabled:
      enabled &&
      Boolean(payload?.day && payload?.period_duration_id) &&
      Boolean(payload?.teacher_id || payload?.course_id),
    staleTime: FIVE_MINUTES,
    retry: false,
  });

/**
 * Period-aligned slots for a day, used when only a hall is known (the
 * recommender needs a teacher or course).
 */
export const useGeneratedSlots = (payload, { enabled = true } = {}) =>
  useQuery({
    queryKey: ["semester-timetable-generated-slots", payload],
    queryFn: () => generateSlots(payload),
    enabled:
      enabled &&
      Boolean(
        payload?.day &&
        payload?.period_duration_id &&
        payload?.start_time &&
        payload?.end_time,
      ),
    staleTime: FIVE_MINUTES,
    retry: false,
  });

/** Courses of a school semester, optionally only those a teacher teaches. */
export const useSemesterCourses = (schoolSemesterId, teacherId = null) =>
  useQuery({
    queryKey: ["semester-timetable-courses", schoolSemesterId, teacherId],
    queryFn: () =>
      getCoursesSchoolSemesterId({
        school_semester_id: schoolSemesterId,
        ...(teacherId ? { teacher_id: teacherId } : {}),
      }),
    enabled: Boolean(schoolSemesterId),
    staleTime: FIVE_MINUTES,
  });

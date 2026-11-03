import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useGetActiveHalls } from "../../../../hooks/hall/useGetActiveHall";
import { useSemesterCourses } from "../../../../hooks/semesterTimetableHelper/useSlotSuggestions";
import { useGetTeachersSemesterId } from "../../../../hooks/semesterTimetableHelper/useGetTeachersSemesterId";

const listOf = (response) =>
  Array.isArray(response?.data)
    ? response.data
    : Array.isArray(response)
      ? response
      : [];

/**
 * Teachers, halls and courses a request can use, as { value, label } options
 * plus id -> label lookups. Only the lists a constraint needs are fetched.
 */
export function useRequestOptions(config) {
  const schoolSemester = useSelector(
    (state) => state.semesterTimetable.schoolSemester,
  );
  const semesterId = schoolSemester?.id;
  const needs = (field) => config.fields.includes(field);

  const teachersQuery = useGetTeachersSemesterId(
    needs("teacher_id") ? semesterId : undefined,
  );
  const hallsQuery = useGetActiveHalls();
  const coursesQuery = useSemesterCourses(
    needs("course_id") ? semesterId : null,
  );

  return useMemo(() => {
    const teachers = listOf(teachersQuery.data).map((teacher) => ({
      value: teacher.teacher_id ?? teacher.id,
      label: teacher.teacher_name ?? teacher.name,
      meta:
        teacher.courses_count != null
          ? `${teacher.courses_count} course${teacher.courses_count === 1 ? "" : "s"}`
          : null,
    }));
    const halls = needs("hall_id")
      ? listOf(hallsQuery.data).map((hall) => ({
          value: hall.id,
          label: hall.name,
          meta: hall.capacity ? `${hall.capacity} seats` : null,
        }))
      : [];
    const courses = listOf(coursesQuery.data)
      .filter(Boolean)
      .map((course) => ({
        value: course.id,
        label: course.course_title,
        meta: course.course_code ?? null,
      }));

    const lookup = (options) =>
      Object.fromEntries(options.map((option) => [option.value, option.label]));

    return {
      schoolSemester,
      options: { teacher_id: teachers, hall_id: halls, course_id: courses },
      labels: {
        teacher_id: lookup(teachers),
        hall_id: lookup(halls),
        course_id: lookup(courses),
      },
      loading: {
        teacher_id: needs("teacher_id") && teachersQuery.isLoading,
        hall_id: needs("hall_id") && hallsQuery.isLoading,
        course_id: needs("course_id") && coursesQuery.isLoading,
      },
      errors: {
        teacher_id: needs("teacher_id") ? teachersQuery.error : null,
        hall_id: needs("hall_id") ? hallsQuery.error : null,
        course_id: needs("course_id") ? coursesQuery.error : null,
      },
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    schoolSemester,
    teachersQuery.data,
    teachersQuery.isLoading,
    teachersQuery.error,
    hallsQuery.data,
    hallsQuery.isLoading,
    hallsQuery.error,
    coursesQuery.data,
    coursesQuery.isLoading,
    coursesQuery.error,
  ]);
}

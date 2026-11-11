const searchableText = (course) =>
  [
    course?.course_title,
    course?.course_code,
    course?.assignment_status,
    ...(course?.types ?? []).map((type) => type?.name),
    ...(course?.teachers ?? []).flatMap((teacher) => [teacher?.name, teacher?.username]),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

// Filters semester groups ({ semester_id, semester_name, courses }) by a
// query; every word must match the course's title, code, status, types or
// assigned teacher. Semesters left with no courses are dropped.
export const filterSemesterCourses = (semesters, query) => {
  const list = Array.isArray(semesters) ? semesters : [];
  const terms = (query ?? "").toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return list;
  return list
    .map((semester) => ({
      ...semester,
      courses: (semester?.courses ?? []).filter((course) => {
        const text = searchableText(course);
        return terms.every((term) => text.includes(term));
      }),
    }))
    .filter((semester) => semester.courses.length > 0);
};

export const countCourses = (semesters) =>
  (Array.isArray(semesters) ? semesters : []).reduce(
    (sum, semester) => sum + (semester?.courses?.length ?? 0),
    0,
  );

export const isCourseAssigned = (course) => course?.assignment_status === "assigned";

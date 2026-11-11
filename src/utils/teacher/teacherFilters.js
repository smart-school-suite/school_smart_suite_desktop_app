// The teacher-specialty endpoints answer 404 when a list is simply empty,
// so that status is an empty state, not a failure.
export const isEmptyListError = (error) => error?.response?.status === 404;

// Retry real failures once, but never retry an empty (404) list.
export const retryUnlessEmpty = (failureCount, error) =>
  !isEmptyListError(error) && failureCount < 1;

const searchableText = (teacher) =>
  [
    teacher?.name,
    teacher?.first_name,
    teacher?.last_name,
    teacher?.username,
    ...(teacher?.qualifications ?? []).flatMap((qualification) => [
      qualification?.name,
      qualification?.abbreviation,
      qualification?.pivot?.field_of_study,
    ]),
    ...(teacher?.levels ?? []).map((level) => level?.name),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

// Every word of the query must appear somewhere on the teacher's card
// (name, username, qualifications, fields of study or teaching levels).
export const filterTeachers = (teachers, query) => {
  const list = Array.isArray(teachers) ? teachers : [];
  const terms = (query ?? "").toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return list;
  return list.filter((teacher) => {
    const text = searchableText(teacher);
    return terms.every((term) => text.includes(term));
  });
};

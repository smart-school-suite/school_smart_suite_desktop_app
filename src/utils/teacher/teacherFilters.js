// The teacher-specialty endpoints answer 404 when a list is simply empty;
// the helpers live in utils/query/emptyList and stay importable from here.
export { isEmptyListError, retryUnlessEmpty } from "../query/emptyList";

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

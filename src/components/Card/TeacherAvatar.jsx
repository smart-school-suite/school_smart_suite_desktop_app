const initialsOf = (teacher) => {
  const first = teacher?.first_name?.trim()?.charAt(0) ?? "";
  const last = teacher?.last_name?.trim()?.charAt(0) ?? "";
  if (first || last) return `${first}${last}`.toUpperCase();
  return (teacher?.name ?? teacher?.username ?? "?")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();
};

// Initials avatar used by TeacherCard and the teacher details dialog.
export default function TeacherAvatar({ teacher, size = "2.5rem" }) {
  return (
    <div
      className="teacher-card__avatar"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {initialsOf(teacher)}
    </div>
  );
}

import { initials } from "../../../utils/jointCourse/teacherAssignment";

function TeacherAvatar({ teacher, size = "md" }) {
  return (
    <span className={`jca-avatar jca-avatar--${size}`} aria-hidden="true">
      {initials(teacher)}
    </span>
  );
}

export default TeacherAvatar;

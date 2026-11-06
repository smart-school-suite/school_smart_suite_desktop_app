import { initials } from "../../../utils/jointCourse/teacherAssignment";

function TeacherAvatar({ teacher, size = "md" }) {
  return (
    <span className="bg-primary-100 text-primary-500 rounded-circle fw-semibold"
      style={{
         width:"2.5rem",
         height:"2.5rem",
         display:"grid",
         placeItems:"center"
      }}
    >
      {initials(teacher)}
    </span>
  );
}

export default TeacherAvatar;

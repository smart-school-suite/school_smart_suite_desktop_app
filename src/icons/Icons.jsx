import { Icon } from "@iconify/react";

const TeacherIcon = ({ iconStyle }) => {
  return (
    <Icon icon="hugeicons:teacher" style={{ ...iconStyle, fontSize: "1rem" }} />
  );
};

const SchoolAdminIcon = ({ iconStyle }) => {
  return (
    <Icon
      icon="grommet-icons:user-admin"
      style={{ ...iconStyle, fontSize: "1rem" }}
    />
  );
};

const CourseIcon = ({ iconStyle }) => {
   return(
     <Icon icon="solar:book-outline" style={{ ...iconStyle, fontSize: "1rem" }} />
   )
}

const SemesterIcon = ({ iconStyle }) => {
   return(
    <Icon icon="heroicons:calendar-days" style={{ ...iconStyle, fontSize: "1rem" }} />
   )
}

const GradeIcon = ({ iconStyle }) => {
   return (
    <Icon icon="ph:exam" style={{ ...iconStyle, fontSize: "1rem" }} />
   )
}

const TimetableIcon = ({ iconStyle }) => {
   return(
    <Icon icon="akar-icons:schedule" style={{ ...iconStyle, fontSize: "1rem" }}  />
   )
}

const ExamIcon = ({ iconStyle }) => {
   return(
      <Icon icon="healthicons:i-exam-multiple-choice-outline" style={{ ...iconStyle, fontSize: "1rem" }} />
   )
}

const ExamCandidateIcon = ({ iconStyle }) => {
  return(
     <Icon icon="ph:users-four-light" style={{ ...iconStyle, fontSize: "1rem" }} />
  )
}
export { TeacherIcon, SchoolAdminIcon, CourseIcon, SemesterIcon, GradeIcon, TimetableIcon, ExamIcon, ExamCandidateIcon };

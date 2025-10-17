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

const StudentIcon = ({ iconStyle }) => {
   return(
    <Icon icon="ph:student-light" style={{ ...iconStyle, fontSize: "1rem" }} />
   )
}

const ParentIcon = ({ iconStyle }) => {
   return (
    <Icon icon="ri:parent-line" style={{ ...iconStyle, fontSize: "1rem" }}/>
   )
}

const BatchIcon = ({ iconStyle }) => {
   return(
    <Icon icon="fluent:group-24-regular" style={{ ...iconStyle, fontSize: "1rem" }} />
   )
}

const MoneyIcon = ({ iconStyle }) => {
   return (
    <Icon icon="solar:hand-money-linear" style={{ ...iconStyle, fontSize: "1rem" }} />
   )
}

const ExpensesIcon = ({ iconStyle }) => {
    return(
      <Icon icon="fluent:money-hand-24-regular" style={{ ...iconStyle, fontSize: "1rem" }} />
    )
}

const AdditionalFeeIcon = ({ iconStyle }) => {
    return (
      <Icon icon="fluent:person-money-24-regular" style={{ ...iconStyle, fontSize: "1rem" }} />
    )
}

const TuitionFeeIcon = ({ iconStyle }) => {
    return (
      <Icon icon="solar:money-bag-outline" style={{ ...iconStyle, fontSize: "1rem" }} />
    )
}

const SpecialtyIcon = ({ iconStyle }) => {
    return (
      <Icon icon="streamline:ecology-science-dna-biology-experiment-lab-science" style={{ ...iconStyle, fontSize: "1rem" }} />
    )
}

const DepartmentIcon = ({ iconStyle }) => {
    return (
      <Icon icon="la:university"  style={{ ...iconStyle, fontSize: "1rem" }} />
    )
}

const StatsIcon = ({ iconStyle }) => {
   return (
     <Icon icon="iconoir:stats-down-square" style={{ ...iconStyle, fontSize: "1rem" }}  />
   )
}

const ElectionIcon = ({ iconStyle }) => {
   return(
     <Icon icon="fluent:vote-24-regular" style={{ ...iconStyle, fontSize: "1rem" }} />
   )
}
const LiveIcon = ({ iconStyle }) => {
     return (
        <Icon icon="fluent:live-24-filled" style={{...iconStyle, fontSize:"1rem"}} />
     )
}

const EventIcon = ({ iconStyle }) => {
   return(
    <Icon icon="clarity:event-line" style={{...iconStyle, fontSize:"1rem"}}  />
   )
}
export { EventIcon, LiveIcon, ElectionIcon, StatsIcon, DepartmentIcon, SpecialtyIcon, TuitionFeeIcon, AdditionalFeeIcon, ExpensesIcon, MoneyIcon, BatchIcon, ParentIcon, StudentIcon, TeacherIcon, SchoolAdminIcon, CourseIcon, SemesterIcon, GradeIcon, TimetableIcon, ExamIcon, ExamCandidateIcon };

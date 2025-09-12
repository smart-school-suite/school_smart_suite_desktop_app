import { CoursesCellStyle } from "./AgGridTableStyle";
import TextComponent from "../components/DataTableComponents/TextComponent";
import DateComponent from "../components/DataTableComponents/DateComponent";
import CurrencyComponent from "../components/DataTableComponents/CurrencyComponent";
import React from "react";
import DepartmentTableBadge from "../components/Badges/DepartmentTableBadge";
import SpecailtyTableBadge from "../components/Badges/SpecialtyTableBadge";
import TeacherTableBadge from "../components/Badges/TeacherTableBadge";
import { TeacherAvatarComponent } from "../components/DataTableComponents/TeacherTableAvatar";
import ActiveInactiveBadge from "../components/Badges/ActiveInactive";
import GradesConfigTableBadge from "../components/Badges/GradesConfigTableBadge";
import { StudentTableAvatarComponent } from "../components/DataTableComponents/StudentTableAvatar";
import { ExamGradingBadge } from "../components/Badges/ExamGradingBadge";
import RegistrationFeeTableBadge from "../components/Badges/RegistrationFeeTableBadge";
import SemesterBadge from "../components/Badges/SemesterBadge";
import TimetableBadge from "../components/Badges/TimetableBadge";
import AccessmentStatus from "../components/Badges/AccessmentStatus";
import GradeSubmittedStatus from "../components/Badges/GradeSubmittedStatus";
import ISODateComponent from "../components/DataTableComponents/ISODateComponent"
const cellStyle = CoursesCellStyle;
export function CoursesTable({ DropdownComponent }) {
  const coursesTableConfig = [
    {
      field: "id",
      cellRenderer: TextComponent,
      hide: true,
    },
    {
      field: "course_code",
      headerName: "Course Code",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    {
      field: "course_title",
      headerName: "Course Title",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    {
      field: "credit",
      headerName: "Course Credit",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    {
      field: "semester_title",
      headerName: "Semester",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    {
      field: "specialty_name",
      headerName: "Specialty Name",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    {
      field: "level_name",
      headerName: "Level Name",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    {
      field: "level_number",
      headerName: "Level",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    {
      field: "status",
      headerName: "Status",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: ActiveInactiveBadge,
    },
    {
      field: "Action",
      cellRenderer: DropdownComponent,
      cellStyle: () => ({ width: "20rem" }),
    },
  ];
  return coursesTableConfig;
}
export function ExamCandidateTableConfig({ DropdownComponent }) {
  const tableConfig = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "student_name",
      headerName: "Student Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "level_name",
      headerName: "level Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "specialty_name",
      headerName: "Specialty Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "exam_name",
      headerName: "Exam Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "student_accessed",
      headerName: "Accessment Status",
      filter: true,
      floatingFilter: true,
      cellRenderer: AccessmentStatus,
      cellStyle: cellStyle,
    },
    {
      field: "grades_submitted",
      headerName: "Grades Submitted",
      filter: true,
      floatingFilter: true,
      cellRenderer: GradeSubmittedStatus,
      cellStyle: cellStyle,
    },
    {
      field: "Actions",
      cellRenderer: DropdownComponent,
      cellStyle: () => ({ width: "20rem" }),
    },
  ];
  return tableConfig;
}
export function ExamsTableConfig({ DropdownComponent }) {
  const tableConfig = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "exam_name",
      headerName: "Exam Title",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    {
      field: "semester_name",
      headerName: "Semester",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    {
      field: "level_name",
      headerName: "Level Name",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    {
      field: "specailty_name",
      headerName: "Specialty Name",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    {
      field: "school_year",
      headerName: "School Year",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    {
      field: "weighted_mark",
      headerName: "Max Score",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    {
      field: "grading_added",
      headerName: "Grading Status",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: ExamGradingBadge,
    },
    {
      field: "Action",
      cellRenderer: DropdownComponent,
      cellStyle: () => ({ width: "20rem" }),
    },
  ];
  return tableConfig;
}
export function ResitExamTableConfig({ DropdownComponent }){
    const tableConfig = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "exam_name",
      headerName: "Exam Title",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    {
      field: "semester_name",
      headerName: "Semester",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    {
      field: "level_name",
      headerName: "Level Name",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    {
      field: "specailty_name",
      headerName: "Specialty Name",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    {
      field: "school_year",
      headerName: "School Year",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    {
      field: "weighted_mark",
      headerName: "Max Score",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    {
      field: "grading_added",
      headerName: "Grading Status",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: ExamGradingBadge,
    },
    {
      field: "Action",
      cellRenderer: DropdownComponent,
      cellStyle: () => ({ width: "20rem" }),
    },
  ];
  return tableConfig;
}
export function ExamGradingCongfig({ DropdownComponent }) {
  const tableConfig = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "grade_title",
      headerName: "Grades Title",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    {
      field: "max_score",
      headerName: "Max Score",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    {
      field: "isgrades_configured",
      headerName: "Grades Configured",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: GradesConfigTableBadge,
    },
    {
      field: "status",
      headerName: "Status",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: ActiveInactiveBadge,
    },
    {
      field: "created_at",
      headerName: "Created At",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: ISODateComponent,
    },
    {
      field: "updated_at",
      headerName: "Updated At",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: ISODateComponent,
    },
    {
      field: "Action",
      cellRenderer: DropdownComponent,
      cellStyle: () => ({ width: "20rem" }),
    },
  ];
  return tableConfig;
}
export function ExamTimetableConfig({ DropdownComponent }) {
  const tableConfig = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "exam_name",
      headerName: "Exam Name",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    {
      field: "semester_name",
      headerName: "Semester",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    {
      field: "specailty_name",
      headerName: "Specailty Name",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    {
      field: "level_name",
      headerName: "Level Name",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    {
      field: "start_date",
      headerName: "Start Date",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    {
      field: "end_date",
      headerName: "End Date",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    {
      field: "batch_title",
      headerName: "Batch Title",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    {
      field: "timetable_published",
      headerName: "Timetable Status",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TimetableBadge,
    },
    {
      field: "Action",
      cellRenderer: DropdownComponent,
      cellStyle: () => ({ width: "20rem" }),
    },
  ];
  return tableConfig;
}
export function ResitTimetableConfig({ DropdownComponent }) {
  const tableConfig = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "exam_name",
      headerName: "Exam Name",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    {
      field: "semester_name",
      headerName: "Semester",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    {
      field: "specailty_name",
      headerName: "Specailty Name",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    {
      field: "level_name",
      headerName: "Level Name",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    {
      field: "start_date",
      headerName: "Start Date",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    {
      field: "end_date",
      headerName: "End Date",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    {
      field: "timetable_published",
      headerName: "Timetable Status",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TimetableBadge,
    },
    {
      field: "Action",
      cellRenderer: DropdownComponent,
      cellStyle: () => ({ width: "20rem" }),
    },
  ];
  return tableConfig;
}
export function ResitFeeTableConfig({ DropdownComponent }) {
  const tableConfig = [
    {
      field: "student_name",
      headerName:"Student Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "course_name",
      headerName:"Course Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
     {
      field: "specialty_name",
      headerName:"Specialty Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "payment_status",
      headerName:"Payment Status",
      filter: true,
      floatingFilter: true,
      cellRenderer: RegistrationFeeTableBadge,
      cellStyle: cellStyle,
    },
    {
      field: "resit_fee",
      headerName:"Resit Fee",
      filter: true,
      floatingFilter: true,
      cellRenderer: CurrencyComponent,
      cellStyle: cellStyle,
    },
    {
      field: "Action",
      cellRenderer: DropdownComponent,
      cellStyle: () => ({ width: "20rem" }),
    },
  ];
  return tableConfig;
}
export function StudentResitTableConfig({ DropdownComponent }){
    const tableConfig = [
    {
      field: "student_name",
      headerName:"Student Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "course_name",
      headerName:"Course Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
     {
      field: "specialty_name",
      headerName:"Specialty Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "level_name",
      headerName:"Level Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "level",
      headerName:"Level",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "Action",
      cellRenderer: DropdownComponent,
      cellStyle: () => ({ width: "20rem" }),
    },
  ];
  return tableConfig;
}
export function GradesConfigTableConfig({ ActionButton }) {
  const tableConfig = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "Exam Name",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    {
      field: "Semeseter",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    {
      field: "Specialty",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    {
      field: "Level",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    {
      field: "Start Date",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    {
      field: "End Date",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    {
      field: "School Year",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    {
      field: "Weighted Mark",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    {
      field: "Action",
      cellRenderer: ActionButton,
      cellStyle: () => ({ width: "20rem" }),
    },
  ];
  return tableConfig;
}
export function TuitionFeeTableConfig({ DropdownComponent }) {
  const tableConfig = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "student_name",
      filter: true,
      headerName: "Student Name",
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "level",
      filter: true,
      headerName: "Level",
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "specailty_name",
      filter: true,
      headerName: "Specialty",
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "fee_status",
      filter: true,
      headerName: "Fee status",
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "total_fee_debt",
      filter: true,
      headerName: "Fee Debt",
      floatingFilter: true,
      cellRenderer: Amount,
      cellStyle: cellStyle,
    },
    {
      field: "Actions",
      filter: true,
      floatingFilter: true,
      cellRenderer: DropdownComponent,
      cellStyle: () => ({ width: "20rem" }),
    },
  ];
  return tableConfig;
}
export function SchoolExpensesTableConfig({ DropdownComponent }) {
  const tableConfig = [
    {
      field: "category_name",
      headerName: "Category",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "amount",
      headerName: "Amount",
      filter: true,
      floatingFilter: true,
      cellRenderer: CurrencyComponent,
      cellStyle: cellStyle,
    },
    {
      field: "description",
      headerName: "Description",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "date",
      headerName: "Date",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "Action",
      cellRenderer: DropdownComponent,
      cellStyle: () => ({ width: "20rem" }),
    },
  ];
  return tableConfig;
}
export function ExpensesCategoryTableConfig({ DropdownComponent }) {
  const tableConfig = [
    {
      field: "name",
      headerName: "Title",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "created_at",
      headerName: "Created At",
      filter: true,
      floatingFilter: true,
      cellRenderer: ISODateComponent,
      cellStyle: cellStyle,
    },
    {
      field: "updated_at",
      headerName: "Updated At",
      filter: true,
      floatingFilter: true,
      cellRenderer: ISODateComponent,
      cellStyle: cellStyle,
    },
    {
      field: "Action",
      cellRenderer: DropdownComponent,
      cellStyle: () => ({ width: "20rem" }),
    },
  ];
  return tableConfig;
}
export function CategoryTableConfig({ DropdownComponent }) {
  const tableConfig = [
    {
      field: "name",
      headerName: "Title",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "description",
      headerName: "Description",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "status",
      headerName: "Status",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "Action",
      cellRenderer: DropdownComponent,
      cellStyle: () => ({ width: "20rem" }),
    },
  ];
  return tableConfig;
}
export function AdditionalFeeCategoryTableConfig({ DropdownComponent }) {
  const tableConfig = [
    {
      field: "title",
      headerName: "Title",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "created_at",
      headerName: "Created At",
      filter: true,
      floatingFilter: true,
      cellRenderer: ISODateComponent,
      cellStyle: cellStyle,
    },
    {
      field: "updated_at",
      headerName: "Updated At",
      filter: true,
      floatingFilter: true,
      cellRenderer: ISODateComponent,
      cellStyle: cellStyle,
    },
    {
      field: "Action",
      cellRenderer: DropdownComponent,
      cellStyle: () => ({ width: "20rem" }),
    },
  ];
  return tableConfig;
}
export function ParentsTableConfig({ DropdownComponent }) {
  const tableConfig = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "guardian_name",
      headerName: "Guardian Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "address",
      headerName: "Address",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "phone_one",
      headerName: "First Reachable Number",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "phone_two",
      headerName: "Second Reachable Number",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "relationship_to_student",
      headerName: "Relationship To Student",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "preferred_contact_method",
      headerName: "Preferred Contact Method",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "Action",
      filter: true,
      floatingFilter: true,
      cellRenderer: DropdownComponent,
      cellStyle: () => ({ width: "20rem" }),
    },
  ];
  return tableConfig;
}
export function StudentBatchesTableConfig({ DropdownComponent }) {
  const tableConfig = [
    {
      field: "id",
      floatingFilter: true,
      hide: true,
      cellRenderer: TextComponent,
    },
    {
      field: "name",
      headerName: "Batch Title",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    {
      field: "description",
      headerName: "Description",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    {
      field: "status",
      headerName: "Status",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: ActiveInactiveBadge,
    },
    {
      field: "created_at",
      headerName: "Date of Creation",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: ISODateComponent,
    },
    {
      field: "updated_at",
      headerName: "Date Updated",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: ISODateComponent,
    },
    {
      field: "Action",
      cellStyle: () => ({ width: "20rem" }),
      cellRenderer: DropdownComponent,
    },
  ];
  return tableConfig;
}
export function StudentTableConfig({ DropdownComponent }) {
  const tableConfig = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "profile_picture",
      headerName: "Avatar",
      cellRenderer: StudentTableAvatarComponent,
      cellStyle: cellStyle,
      filter: true,
      floatingFilter: true,
    },
    {
      field: "student_name",
      headerName: "Student Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "level_name",
      headerName: "Level",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "specialty_name",
      headerName: "Specialty",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "status",
      headerName: "Account Status",
      filter: true,
      floatingFilter: true,
      cellRenderer: ActiveInactiveBadge,
      cellStyle: cellStyle,
    },
    {
      field: "student_gender",
      headerName: "Gender",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "batch_title",
      headerName: "Student Batch",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "Actions",
      cellRenderer: DropdownComponent,
      cellStyle: () => ({ width: "20rem" }),
    },
  ];
  return tableConfig;
}
export function StudentScoresTableConfig({ DropdownComponent }) {
  const tableConfig = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "Student Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: {
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        height: "100%",
        zIndex: "-1",
      },
    },
    {
      field: "Specialty Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: {
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        height: "100%",
        zIndex: "-1",
      },
    },
    {
      field: "Level",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: {
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        height: "100%",
        zIndex: "-1",
      },
    },
    {
      field: "Level Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: {
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        height: "100%",
        zIndex: "-1",
      },
    },
    {
      field: "School Year",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: {
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        height: "100%",
        zIndex: "-1",
      },
    },
    {
      field: "Exam Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: {
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        height: "100%",
        zIndex: "-1",
      },
    },
    {
      field: "Course Title",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: {
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        height: "100%",
        zIndex: "-1",
      },
    },
    {
      field: "Score",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: {
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        height: "100%",
        zIndex: "-1",
      },
    },
    {
      field: "Grade",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: {
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        height: "100%",
        zIndex: "-1",
      },
    },
    {
      field: "Action",
      cellRenderer: DropdownComponent,
      cellStyle: () => ({ width: "20rem" }),
    },
  ];
  return tableConfig;
}
export function DepartmentTableConfig({ DropdownComponent }) {
  const tableConfig = [
    {
      field: "department_name",
      headerName: "Department Name",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    {
      field: "description",
      headerName: "Description",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    {
      field: "status",
      headerName: "Department Status",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: DepartmentTableBadge,
    },
    {
      field:"created_at",
      headerName:"Creation Date",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
       cellRenderer: ISODateComponent,
    },
     {
      field:"updated_at",
      headerName:"Update Date",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
       cellRenderer:ISODateComponent,
    },
    {
      field: "Action",
      cellRenderer: DropdownComponent,
      cellStyle: () => ({ width: "20rem" }),
    },
  ];
  return tableConfig;
}
export function SchoolAdminTableConfig({ ImageComponent, ActionButtonGroup }) {
  const tableConfig = [
    {
      field: "profile_picture",
      headerName: "Avatar",
      cellRenderer: ImageComponent,
      cellStyle: cellStyle,
      filter: true,
      floatingFilter: true,
    },

    {
      field: "name",
      headerName: "Full Names",
      cellRenderer: TextComponent,
      filter: true,
      floatingFilter: true,
    },
    {
      field: "first_name",
      headerName: "First Name",
      cellRenderer: TextComponent,
      filter: true,
      floatingFilter: true,
    },
    {
      field: "last_name",
      headerName: "Last Name",
      cellRenderer: TextComponent,
      filter: true,
      floatingFilter: true,
    },
    {
      field: "email",
      headerName: "E-mail",
      cellRenderer: TextComponent,
      filter: true,
      floatingFilter: true,
    },
    {
      field: "status",
      headerName: "account status",
      cellRenderer: ActiveInactiveBadge,
      filter: true,
      floatingFilter: true,
    },
    {
      field: "Action",
      cellRenderer: React.memo(ActionButtonGroup),
      cellStyle: () => ({ width: "20rem" }),
    },
  ];
  return tableConfig;
}
export function SpecialtyTableConfig({ DropdownComponent }) {
  const tableConfig = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "specialty_name",
      headerName: "Specialty Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "registration_fee",
      headerName: "Registration Fee",
      filter: true,
      floatingFilter: true,
      cellRenderer: CurrencyComponent,
      cellStyle: cellStyle,
    },
    {
      field: "tuition_fee",
      headerName: "School Fee",
      filter: true,
      floatingFilter: true,
      cellRenderer: CurrencyComponent,
      cellStyle: cellStyle,
    },
    {
      field: "total",
      headerName: "Total",
      filter: true,
      floatingFilter: true,
      cellRenderer: CurrencyComponent,
      cellStyle: cellStyle,
    },
    {
      field: "level_name",
      headerName: "Level Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "level",
      headerName: "Level Number",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "status",
      headerName: "Status",
      filter: true,
      floatingFilter: true,
      cellRenderer: SpecailtyTableBadge,
      cellStyle: cellStyle,
    },
    {
      field: "Action",
      cellStyle: () => ({ width: "20rem" }),
      cellRenderer: DropdownComponent,
    },
  ];
  return tableConfig;
}
export function teacherTableConfig({ DropdownComponent }) {
  const tableConfig = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "profile_picture",
      headerName: "Avatar",
      cellRenderer: TeacherAvatarComponent,
      cellStyle: cellStyle,
      filter: true,
      floatingFilter: true,
    },
    {
      field: "name",
      headerName: "Full Names",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    {
      field: "first_name",
      headerName: "First Name",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    {
      field: "last_name",
      headerName: "Last Name",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    {
      headerName: "Email",
      field: "email",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    {
      headerName: "Contact One",
      field: "phone_one",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    {
      headerName: "Gender",
      field: "gender",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    {
      field: "status",
      headerName: "Status",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TeacherTableBadge,
    },
    {
      field: "Action",
      cellRenderer: DropdownComponent,
      cellStyle: () => ({ width: "20rem" }),
    },
  ];
  return tableConfig;
}
export function semesterTableConfig({ ActionButtonGroup }) {
  const tableConfig = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "specialty_name",
      headerName: "Specialty Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "semester_name",
      headerName: "Semester",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "start_date",
      headerName: "start Date",
      filter: true,
      floatingFilter: true,
      cellRenderer: DateComponent,
      cellStyle: cellStyle,
    },
    {
      field: "end_date",
      headerName: "End Date",
      filter: true,
      floatingFilter: true,
      cellRenderer: DateComponent,
      cellStyle: cellStyle,
    },
    {
      field: "status",
      headerName: "Status",
      filter: true,
      floatingFilter: true,
      cellRenderer: SemesterBadge,
      cellStyle: cellStyle,
    },
    {
      field: "level",
      headerName: "Level",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "level_name",
      headerName: "Level Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "school_year",
      headerName: "School Year",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "Action",
      cellRenderer: ActionButtonGroup,
      cellStyle: () => ({ width: "20rem" }),
    },
  ];
  return tableConfig;
}
export function SpecialtyTimetableTableConfig({ ActionButtonGroup }) {
  const tableConfig = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "specialty_name",
      headerName: "Specialty Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "semester_name",
      headerName: "Semester",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "start_date",
      headerName: "start Date",
      filter: true,
      floatingFilter: true,
      cellRenderer: DateComponent,
      cellStyle: cellStyle,
    },
    {
      field: "end_date",
      headerName: "End Date",
      filter: true,
      floatingFilter: true,
      cellRenderer: DateComponent,
      cellStyle: cellStyle,
    },
    {
      field: "status",
      headerName: "Status",
      filter: true,
      floatingFilter: true,
      cellRenderer: SemesterBadge,
      cellStyle: cellStyle,
    },
    {
      field: "timetable_published",
      headerName: "Timetable Status",
      filter: true,
      floatingFilter: true,
      cellRenderer: TimetableBadge,
      cellStyle: cellStyle,
    },
    {
      field: "level_name",
      headerName: "Level Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "school_year",
      headerName: "School Year",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "Action",
      cellRenderer: ActionButtonGroup,
      cellStyle: () => ({ width: "20rem" }),
    },
  ];
  return tableConfig;
}
export function tuitionFeeTableConfig({ DropdownComponent }) {
  const tableConfig = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "student_name",
      headerName: "Student Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "specialty_name",
      headerName: "Specialty Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "level_name",
      headerName: "Level Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "amount_paid",
      headerName: "Amount Paid",
      filter: true,
      floatingFilter: true,
      cellRenderer: CurrencyComponent,
      cellStyle: cellStyle,
    },
    {
      field: "amount_left",
      headerName: "Amount Left",
      filter: true,
      floatingFilter: true,
      cellRenderer: CurrencyComponent,
      cellStyle: cellStyle,
    },
    {
      field: "status",
      headerName: "Payment Status",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "Action",
      cellRenderer: DropdownComponent,
      cellStyle: () => ({ width: "20rem" }),
    },
  ];
  return tableConfig;
}
export function registrationFeeTableConfig({ DropdownComponent }) {
  const tableConfig = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "student_name",
      headerName: "Student Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "specialty_name",
      headerName: "Specialty Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "level_name",
      headerName: "Level Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "amount",
      headerName: "Amount",
      filter: true,
      floatingFilter: true,
      cellRenderer: CurrencyComponent,
      cellStyle: cellStyle,
    },
    {
      field: "status",
      headerName: "Payment Status",
      filter: true,
      floatingFilter: true,
      cellRenderer: RegistrationFeeTableBadge,
      cellStyle: cellStyle,
    },
    {
      field: "Action",
      cellRenderer: DropdownComponent,
      cellStyle: () => ({ width: "20rem" }),
    },
  ];
  return tableConfig;
}
export function additionalFeesTableConfig({ DropdownComponent }) {
  const tableConfig = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "student_name",
      headerName: "Student Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "specialty_name",
      headerName: "Specialty Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "level_name",
      headerName: "Level Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "amount",
      headerName: "Amount",
      filter: true,
      floatingFilter: true,
      cellRenderer: CurrencyComponent,
      cellStyle: cellStyle,
    },
    {
      field: "status",
      headerName: "Payment Status",
      filter: true,
      floatingFilter: true,
      cellRenderer: RegistrationFeeTableBadge,
      cellStyle: cellStyle,
    },
    {
      field: "category",
      headerName: "Category",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "Action",
      cellRenderer: DropdownComponent,
      cellStyle: () => ({ width: "20rem" }),
    },
  ];
  return tableConfig;
}
export function additionalFeesTransactionsTableConfig({ DropdownComponent }) {
  const tableConfig = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "category",
      headerName: "Title",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "student_name",
      headerName: "Student Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "level_name",
      headerName: "Level",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "amount",
      headerName: "Amount",
      filter: true,
      floatingFilter: true,
      cellRenderer: CurrencyComponent,
      cellStyle: cellStyle,
    },
    {
      field: "payment_method",
      headerName: "Payment Method",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "Action",
      cellRenderer: DropdownComponent,
      cellStyle: () => ({ width: "20rem" }),
    },
  ];
  return tableConfig;
}
export function tuitionFeesTransactionTableConfig({ DropdownComponent }) {
  const tableConfig = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "student_name",
      headerName: "Student Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "specialty_name",
      headerName: "Specialty Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "level_name",
      headerName: "Level Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "transaction_id",
      headerName: "Transaction ID",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "amount",
      headerName: "Amount",
      filter: true,
      floatingFilter: true,
      cellRenderer: CurrencyComponent,
      cellStyle: cellStyle,
    },
    {
      field: "payment_method",
      headerName: "Payment Method",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "Action",
      cellRenderer: DropdownComponent,
      cellStyle: {
        width: "20rem",
      },
    },
  ];
  return tableConfig;
}
export function tuitionFeeScheduleTableConfig({ DropdownComponent }){
   const tableConfig = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "config_status",
      headerName: "Configuration Status",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "status",
      headerName: "Status",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "specialty_name",
      headerName: "Specialty Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "level_name",
      headerName: "Level",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "semester",
      headerName: "Semester",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "Action",
      cellRenderer: DropdownComponent,
      cellStyle: () => ({ width: "20rem" }),
    },
  ];
  return tableConfig;
}
export function registrationFeeTransactionTableConfig({ DropdownComponent }) {
  const tableConfig = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "transaction_id",
      headerName: "Transaction ID",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "student_name",
      headerName: "Student Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "specialty_name",
      headerName: "Specialty Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "level_name",
      headerName: "Level Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "amount",
      headerName: "Amount",
      filter: true,
      floatingFilter: true,
      cellRenderer: CurrencyComponent,
      cellStyle: cellStyle,
    },
    {
      field: "payment_method",
      headerName: "Payment Method",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "Action",
      cellRenderer: DropdownComponent,
      cellStyle: {
        width: "20rem",
      },
    },
  ];
  return tableConfig;
}
export function resitFeeTransactionsTableConfig({ DropdownComponent }) {
  const tableConfig = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "student_name",
      headerName: "Student Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "specialty_name",
      headerName: "Specialty Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "level_name",
      headerName: "Level Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "level_number",
      headerName: "Level",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "transaction_id",
      headerName: "Transaction ID",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "amount",
      headerName: "Amount",
      filter: true,
      floatingFilter: true,
      cellRenderer: CurrencyComponent,
      cellStyle: cellStyle,
    },
    {
      field: "payment_method",
      headerName: "Payment Method",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "Action",
      cellRenderer: DropdownComponent,
      cellStyle: {
        width: "20rem",
      },
    },
  ];
  return tableConfig;
}
export function electionTableConfig({ DropdownComponent }) {
  const tableConfig = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "title",
      headerName: "Title",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "start_date",
      headerName: "Start Date",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "end_date",
      headerName: "End Date",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "start_time",
      headerName: "Start Time",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "end_time",
      headerName: "End Time",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "description",
      headerName: "Description",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "Action",
      cellRenderer: DropdownComponent,
      cellStyle: {
        width: "20rem",
      },
    },
  ];
  return tableConfig;
}
export function electionApplicationTableConfig({ DropdownComponent }) {
  const tableConfig = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "student_name",
      headerName: "Student Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "election_title",
      headerName: "Election Title",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "election_role",
      headerName: "Role",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "status",
      headerName: "Status",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "personal_vision",
      headerName: "Personal Vision",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "commitment_statement",
      headerName: "Commitment Statement",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "Action",
      cellRenderer: DropdownComponent,
      cellStyle: {
        width: "20rem",
      },
    },
  ];
  return tableConfig;
}
export function electionRolesTableConfig({ DropdownComponent }) {
  const tableConfig = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "name",
      headerName: "Role Title",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "election_title",
      headerName: "Election Title",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "status",
      headerName: "Status",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "description",
      headerName: "Description",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "Action",
      cellRenderer: DropdownComponent,
      cellStyle: {
        width: "20rem",
      },
    },
  ];
  return tableConfig;
}
export function hodTableConfig({ ActionButtonGroup }) {
  const tableConfig = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "full_names",
      headerName: "Full Names",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "first_name",
      headerName: "First Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "last_name",
      headerName: "Last Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "department_name",
      headerName: "Department Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "department_status",
      headerName: "Department Status",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "Action",
      cellRenderer: ActionButtonGroup,
      cellStyle: {
        width: "20rem",
      },
    },
  ];
  return tableConfig;
}
export function hosTableConfig({ ActionButtonGroup }) {
  const tableConfig = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "full_names",
      headerName: "Full Names",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "first_name",
      headerName: "First Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "last_name",
      headerName: "Last Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "specialty_name",
      headerName: "Specialty Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "specialty_status",
      headerName: "Specialty Status",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "level_name",
      headerName: "Level Title",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "level",
      headerName: "Level Title",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "Action",
      cellRenderer: ActionButtonGroup,
      cellStyle: {
        width: "20rem",
      },
    },
  ];
  return tableConfig;
}
export function studentResultsTableConfig({ DropdownComponent }) {
  const tableConfig = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "student_name",
      headerName: "Student Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "specialty_name",
      headerName: "Specialty Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "level_name",
      headerName: "Level Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "level_number",
      headerName: "Level Number",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "exam_name",
      headerName: "Exam Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "gpa",
      headerName: "GPA",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "Action",
      cellRenderer: DropdownComponent,
      cellStyle: {
        width: "20rem",
      },
    },
  ];
  return tableConfig;
}
export function AccessedResitCandidateTableConfig({ DropdownComponent }) {
  const tableConfig = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "student_name",
      headerName: "Student Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "exam_name",
      headerName: "Exam Title",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "specialty_name",
      headerName: "Specialty",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "level_name",
      headerName: "Level Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "level",
      headerName: "level",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "grades_submitted",
      headerName: "Grades Submitted",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "student_accessed",
      headerName: "Student Accessed",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "weighted_mark",
      headerName: "Max Score",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "Action",
      cellRenderer: DropdownComponent,
      cellStyle: {
        width: "20rem",
      },
    },
  ];
  return tableConfig;
}
export function AnnouncementTableConfig({ DropdownComponent }) {
  const tableConfig = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "title",
      headerName: "Title",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "content",
      headerName: "Content",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "status",
      headerName: "Status",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "category_name",
      headerName: "Category",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "label",
      headerName: "label",
      filter: true,
      cellRenderer: TextComponent,
    },
    {
      field: "Action",
      cellRenderer: DropdownComponent,
      cellStyle: {
        width: "20rem",
      },
    },
  ];
  return tableConfig;
}
export function StudentDropOutTableConfig({ DropdownComponent }) {
  const tableConfig = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "student_name",
      headerName: "Student Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "department_name",
      headerName: "Department Title",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "specialty_title",
      headerName: "Specialty",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "level_name",
      headerName: "Level Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "level",
      headerName: "level",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "reason",
      headerName: "Reason",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "Action",
      cellRenderer: DropdownComponent,
      cellStyle: {
        width: "20rem",
      },
    },
  ];
  return tableConfig;
}
export function AnnouncementCategoryTableConfig({ DropdownComponent }) {
  const tableConfig = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "name",
      headerName: "Title",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "description",
      headerName: "Description",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "created_at",
      headerName: "Created At",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "updated_at",
      headerName: "Updated At",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "Action",
      cellRenderer: DropdownComponent,
      cellStyle: {
        width: "20rem",
      },
    },
  ];
  return tableConfig;
}
export function AnnouncementTagTableConfig({ DropdownComponent }) {
  const tableConfig = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "name",
      headerName: "Title",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "created_at",
      headerName: "Created At",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "updated_at",
      headerName: "Updated At",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "Action",
      cellRenderer: DropdownComponent,
      cellStyle: {
        width: "20rem",
      },
    },
  ];
  return tableConfig;
}
export function ExamResultsTableConfig({ DropdownComponent }){
  const tableConfig = [
    {
      field: "student_name",
      headerName: "Student Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "specialty_name",
      headerName: "Specialty",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "level",
      headerName: "Level",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "exam_name",
      headerName: "Exam",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "gpa",
      headerName: "GPA",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
     {
      field: "total_score",
      headerName: "Total Score",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "Action",
      cellRenderer: DropdownComponent,
      cellStyle: {
        width: "20rem",
      },
    },
  ]
  return tableConfig
}

export function resitFeeTransacTableConfig({ DropdownComponent }) {
  const tableConfig = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "trasaction_id",
      headerName: "Transaction Id",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "amount",
      headerName: "Amount",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "payment_method",
      headerName: "Payment Method",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "course_title",
      headerName: "Course",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "student_name",
      headerName: "Student",
      filter: true,
      floatingFilter: true,
      cellRenderer: CurrencyComponent,
      cellStyle: cellStyle,
    },
    {
      field: "Action",
      cellRenderer: DropdownComponent,
      cellStyle: () => ({ width: "20rem" }),
    },
  ];
  return tableConfig;
}
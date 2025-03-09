import { CoursesCellStyle } from "./AgGridTableStyle";
import TextComponent from "../components/DataTableComponents/TextComponent";
const cellStyle = CoursesCellStyle;
export function CoursesTable({ DropdownComponent }) {
  const coursesTableConfig = [
    {
      field: "id",
      cellRenderer: TextComponent,
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
      field: "course_credit",
      headerName: "Course Credit",
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
    { field: "Action", cellRenderer: DropdownComponent },
  ]
  return coursesTableConfig;
}
export function AccessedStudentsTableConfig({ DropdownComponent }) {
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
        cellStyle: cellStyle,
      },
      {
        field: "Level",
        filter: true,
        floatingFilter: true,
        cellRenderer: TextComponent,
        cellStyle: cellStyle,
      },
      {
        field: "Specialty",
        filter: true,
        floatingFilter: true,
        cellRenderer: TextComponent,
        cellStyle: cellStyle,
      },
      {
        field: "Parent name",
        filter: true,
        floatingFilter: true,
        cellRenderer: TextComponent,
        cellStyle: cellStyle,
      },
      {
        field: "First Reachable Number",
        filter: true,
        floatingFilter: true,
        cellRenderer: TextComponent,
        cellStyle: cellStyle,
      },
      {
        field: "Gender",
        filter: true,
        floatingFilter: true,
        cellRenderer: TextComponent,
        cellStyle: cellStyle,
      },
      {
        field: "Student Batch",
        filter: true,
        floatingFilter: true,
        cellRenderer: TextComponent,
        cellStyle: cellStyle,
      },
      { field: "Actions", cellRenderer: DropdownComponent },
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
      field: "school_year",
      headerName: "Academic Year",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    {
      field: "weighted_mark",
      headerName: "Weighted Mark",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    { field: "Action", cellRenderer: DropdownComponent },
  ];
  return tableConfig;
}
export function ExamResitsConfig({ DropdownComponent }) {
  const tableConfig =  [
    {
      field: "id",
      hide: true,
    },
    {
      field: "Student Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "Level",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "Specialty",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "Exam Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "Course Title",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "Resit Fee",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "Exam Status",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    { field: "Action", cellRenderer: DropdownComponent, cellStyle: cellStyle },
  ];
  return tableConfig;
}
export function ExamTimetableConfig({ DropdownComponent }) {
  const tableConfig =  [
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
    { field: "Action", cellRenderer: DropdownComponent },
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
    { field: "Action", cellRenderer: ActionButton },
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
    },
  ];
  return tableConfig;
}
export function TuitionFeeTransactionsTableConfig({ DropdownComponent }) {
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
      field: "fee_name",
      filter: true,
      headerName: "Fee Title",
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "amount",
      filter: true,
      headerName: "Amount Paid",
      floatingFilter: true,
      cellRenderer: Amount,
      cellStyle: cellStyle,
    },
    {
      field: "Actions",
      filter: true,
      floatingFilter: true,
      cellRenderer: DropdownComponent,
    },
  ];
  return tableConfig;
}
export function ResitFeeTableConfig({ DropdownComponent }) {
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
      cellStyle: cellStyle,
    },
    {
      field: "Level",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "Specialty",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "Exam Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "Course Title",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "Resit Fee",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "Status",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    { field: "Action", cellRenderer: DropdownComponent, cellStyle: cellStyle },
  ];
  return tableConfig;
}
export function SchoolExpensesTableConfig({ DropdownComponent }) {
  const tableConfig =  [
    {
      field: "id",
      filter: true,
      floatingFilter: true,
    },
    {
      field: "Amount",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "Category",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "Description",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "Date",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    { field: "Action", cellRenderer: DropdownComponent, cellStyle: cellStyle },
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
      field: "Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "Address",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "Language Preference",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "Occupation",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "Relationship To Student",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "Contact Method",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "Marital Status",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "Cultural Background",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "Religion",
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
      cellStyle: cellStyle,
    },
  ];
  return tableConfig;
}
export function StudentBatchesTableConfig({ DropdownComponent, DateComponent }) {
  const tableConfig = [
    {
      field: "id",
      floatingFilter: true,
      cellRenderer: TextComponent,
    },
    {
      field: "Name",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    {
      field: "Graduation Date",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: DateComponent,
    },
    {
      field: "Date of creation",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    { field: "Action", cellStyle: cellStyle, cellRenderer: DropdownComponent },
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
      field: "specailty_name",
      headerName: "Specialty",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
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
      field: "phone_one",
      headerName: "First Reachable Number",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "gender",
      headerName: "Gender",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "student_batch",
      headerName: "Student Batch",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    { field: "Actions", cellRenderer: DropdownComponent },
  ];
  return tableConfig
}
export function StudentScoresTableConfig({ DropdownComponent }){
   const tableConfig =  [
      {
        field:"id", hide:true
      },
      { field: "Student Name", filter: true, floatingFilter: true,
        cellRenderer:TextComponent,
        cellStyle: {
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          height: "100%",
          zIndex: "-1",
        }
       },
      { field: "Specialty Name", filter: true, floatingFilter: true,
        cellRenderer:TextComponent,
        cellStyle: {
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          height: "100%",
          zIndex: "-1",
        }
       },
      { field: "Level", filter: true, floatingFilter: true,
        cellRenderer:TextComponent,
        cellStyle: {
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          height: "100%",
          zIndex: "-1",
        }
       },
      { field: "Level Name", filter: true, floatingFilter: true,
        cellRenderer:TextComponent,
        cellStyle: {
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          height: "100%",
          zIndex: "-1",
        }
       },
      { field: "School Year", filter: true, floatingFilter: true,
        cellRenderer:TextComponent,
        cellStyle: {
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          height: "100%",
          zIndex: "-1",
        }
       },
       { field: "Exam Name", filter: true, floatingFilter: true,
        cellRenderer:TextComponent,
        cellStyle: {
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          height: "100%",
          zIndex: "-1",
        }
       },
       { field: "Course Title", filter: true, floatingFilter: true,
        cellRenderer:TextComponent,
        cellStyle: {
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          height: "100%",
          zIndex: "-1",
        }
       },
       { field: "Score", filter: true, floatingFilter: true,
        cellRenderer:TextComponent,
        cellStyle: {
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          height: "100%",
          zIndex: "-1",
        }
       },
       { field: "Grade", filter: true, floatingFilter: true,
        cellRenderer:TextComponent,
        cellStyle: {
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          height: "100%",
          zIndex: "-1",
        }
       },
      { field: "Action", cellRenderer: DropdownComponent }
   ];
   return tableConfig;
}
export function DepartmentTableConfig({ DropdownComponent }){
   const tableConfig = [
    {
      field: "id",
    },
    {
      field: "Department Name",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    {
      field: "Head of Department",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    {
      field: "Date of creation",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    { field: "Action", cellStyle: cellStyle, cellRenderer: DropdownComponent },
   ];
   return tableConfig;
}
export function SchoolAdminTableConfig({ ImageComponent, StatusComponent, ActionButtonGroup, CurrencyComponent }) {
   const tableConfig =  [
    {
      field: "Avatar",
      cellRenderer: ImageComponent,
      cellStyle: cellStyle,
      filter: true,
      floatingFilter: true,
    },
    {
      field: "id",
      cellRenderer: TextComponent,
      filter: true,
      floatingFilter: true,
    },
    {
      field: "Full Names",
      cellRenderer: TextComponent,
      filter: true,
      floatingFilter: true,
    },
    {
      field: "Role",
      cellRenderer: TextComponent,
      filter: true,
      floatingFilter: true,
    },
    {
      field: "Email",
      cellRenderer: TextComponent,
      filter: true,
      floatingFilter: true,
    },
    {
      field: "Salary",
      cellRenderer: CurrencyComponent,
      filter: true,
      floatingFilter: true,
    },
    {
      field: "Status",
      cellRenderer: StatusComponent,
      cellStyle: cellStyle,
    },
    { field: "Created At", cellRenderer: TextComponent },
    {
      field: "Action",
      cellRenderer: ActionButtonGroup,
      cellStyle: {
         width:"20rem"
      },
    }
   ];
   return tableConfig;
}
export function SpecialtyTableConfig({ TextComponent, DropdownComponent }){
   const tableConfig = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "specialty_name",
      headerName:"Specialty Name",
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
      field: "registration_fee",
      headerName:"Registration Fee",
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
      field: "school_fee",
      headerName:"School Fee",
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
      field: "level_name",
      headerName:"Level Name",
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
      field: "level_number",
      headerName:"Level Number",
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
    { field: "Action", cellRenderer: DropdownComponent },
   ];
   return tableConfig;
}
export function teacherTableConfig({ DropdownComponent }) {
   const tableConfig = [
    {
      field:"id",
      hide:true
    },
    {
      field: "Name",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    {
      field: "Employment Status",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    {
      field: "Highest qualification",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    {
      field: "Field of study",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    {
      field: "Religion",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    {
      field: "Years experience",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    {
      field: "Salary",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    { field: "Action", cellRenderer: DropdownComponent },
   ];
   return tableConfig;
}
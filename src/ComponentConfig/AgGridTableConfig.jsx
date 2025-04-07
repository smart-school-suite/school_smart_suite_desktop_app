import { CoursesCellStyle } from "./AgGridTableStyle";
import TextComponent from "../components/DataTableComponents/TextComponent";
import DateComponent from "../components/DataTableComponents/DateComponent";
import CurrencyComponent from "../components/DataTableComponents/CurrencyComponent";
const cellStyle = CoursesCellStyle;
export function CoursesTable({ DropdownComponent }) {
  const coursesTableConfig = [
    {
      field: "id",
      cellRenderer: TextComponent,
      hide:true,

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
      cellRenderer: TextComponent,
    },
    { 
      field: "Action", 
      cellRenderer: DropdownComponent,
      cellStyle: () => ({ width: "20rem" }),
    },
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
        field: "student_name",
        headerName:"Student Name",
        filter: true,
        floatingFilter: true,
        cellRenderer: TextComponent,
        cellStyle: cellStyle,
      },
      {
        field: "level_name",
        headerName:"level Name",
        filter: true,
        floatingFilter: true,
        cellRenderer: TextComponent,
        cellStyle: cellStyle,
      },
      {
        field: "level_number",
        headerName:"Level",
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
        field: "exam_name",
        headerName:"Exam Name",
        filter: true,
        floatingFilter: true,
        cellRenderer: TextComponent,
        cellStyle: cellStyle,
      },
      {
        field: "student_accessed",
        headerName:"student Accessment",
        filter: true,
        floatingFilter: true,
        cellRenderer: TextComponent,
        cellStyle: cellStyle,
      },
      {
        field: "grades_submitted",
        headerName:"Grades Submitted",
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
      field: "exam_type",
      headerName: "Exam Type",
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
      field:"weighted_mark",
      headerName:"Max Score",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
   },
    {
      field: "timetable_published",
      headerName: "Timetable Added",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    {
      field: "grading_added",
      headerName: "Grading Added",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    { 
      field: "Action", 
      cellRenderer: DropdownComponent,
      cellStyle: () => ({ width: "20rem" }),
    }
  ];
  return tableConfig;
}
export function ExamGradingCongfig({ DropdownComponent }){
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
      cellRenderer: TextComponent,
    },
    {
      field: "status",
      headerName: "Status",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },

    { 
      field: "Action", 
      cellRenderer: DropdownComponent,
      cellStyle: () => ({ width: "20rem" }),
    }
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
      field:"batch_title",
      headerName:"Batch Title",
      filter:true,
      floatingFilter:true,
      cellStyle:cellStyle,
      cellRenderer:TextComponent
    },
    {
      field: "status",
      headerName: "Exam Status",
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
      cellRenderer: TextComponent,
    },
    { 
      field: "Action", 
      cellRenderer: DropdownComponent,
      cellStyle: () => ({ width: "20rem" }),
    }
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
    { 
      field: "Action", 
      cellRenderer: DropdownComponent, 
      cellStyle: () => ({ width: "20rem" })
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
    { 
      field: "Action", 
      cellRenderer: DropdownComponent, 
      cellStyle: () => ({ width: "20rem" })
     },
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
      cellRenderer: CurrencyComponent,
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
      cellStyle: () => ({ width: "20rem" }),
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
    { 
      field: "Action", 
      cellStyle: () => ({ width: "20rem" }), 
      cellRenderer: DropdownComponent
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
      field: "guardian_name",
      headerName: "Guardian Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle: cellStyle,
    },
    {
      field: "student_phone_one",
      headerName: "First Reachable Number",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
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
      { 
        field: "Action", 
        cellRenderer: DropdownComponent,
        cellStyle: () => ({ width: "20rem" }),
      }
   ];
   return tableConfig;
}
export function DepartmentTableConfig({ DropdownComponent }){
   const tableConfig = [
    {
      field: "id",
      cellRenderer:TextComponent
    },
    {
      field: "Department Name",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    {
      field: "hod_name",
      headerName:"Head of Department",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    {
      field:"description",
      headerName:"Description",
      filter:true,
      floatingFilter:true,
      cellStyle:cellStyle,
      cellRenderer:TextComponent
    },
    {
      field:"status",
      headerName:"Department Status",
      filter:true,
      floatingFilter:true,
      cellStyle:cellStyle,
      cellRenderer:TextComponent
    },
    {
      field: "Date of creation",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: TextComponent,
    },
    { 
      field: "Action", 
      cellRenderer: DropdownComponent,
      cellStyle: () => ({ width: "20rem" }),
    },
   ];
   return tableConfig;
}
export function SchoolAdminTableConfig({ ImageComponent, StatusComponent, ActionButtonGroup, CurrencyComponent }) {
  const tableConfig =  [
   {
     field: "profile_picture",
     headerName:"Avatar",
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
     cellStyle: () => ({ width: "20rem" }),
   }
  ];
  return tableConfig;
}
export function SpecialtyTableConfig({  DropdownComponent, CurrencyComponent }){
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
      cellStyle:cellStyle
    },
    {
      field: "registration_fee",
      headerName:"Registration Fee",
      filter: true,
      floatingFilter: true,
      cellRenderer: CurrencyComponent,
      cellStyle:cellStyle
    },
    {
      field: "tuition_fee",
      headerName:"School Fee",
      filter: true,
      floatingFilter: true,
      cellRenderer: CurrencyComponent,
      cellStyle:cellStyle
    },
    {
      field:"total",
      headerName:"Total",
      filter:true,
      floatingFilter:true,
      cellRenderer: CurrencyComponent,
      cellStyle:cellStyle
    },
    {
      field: "level_name",
      headerName:"Level Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle:cellStyle
    },
    {
      field: "level",
      headerName:"Level Number",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle:cellStyle
    },
    {
      field:"status",
      headerName:"Status",
      filter:true,
      floatingFilter:true,
      cellRenderer:TextComponent,
      cellStyle:cellStyle
    },
    { field: "Action", 
      cellStyle: () => ({ width: "20rem" }),
      cellRenderer: DropdownComponent },
   ];
   return tableConfig;
}
export function teacherTableConfig({ DropdownComponent, CurrencyComponent  }) {
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
      cellRenderer: CurrencyComponent,
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
      headerName:"Specialty Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle:cellStyle
    },
    {
      field: "semester_name",
      headerName:"Semester",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle:cellStyle
    },
    {
      field: "start_date",
      headerName:"start Date",
      filter: true,
      floatingFilter: true,
      cellRenderer: DateComponent,
      cellStyle:cellStyle
    },
    {
      field: "end_date",
      headerName:"End Date",
      filter: true,
      floatingFilter: true,
      cellRenderer: DateComponent,
      cellStyle:cellStyle
    },
    {
      field:"status",
      headerName:"Status",
      filter:true,
      floatingFilter:true,
      cellRenderer:TextComponent,
      cellStyle:cellStyle
    },
    {
      field:"level",
      headerName:"Level",
      filter:true,
      floatingFilter:true,
      cellRenderer:TextComponent,
      cellStyle:cellStyle
    },
    {
      field:"level_name",
      headerName:"Level Name",
      filter:true,
      floatingFilter:true,
      cellRenderer:TextComponent,
      cellStyle:cellStyle
    },
    {
      field:"timetable_status",
      headerName:"Timetable Status",
      filter:true,
      floatingFilter:true,
      cellRenderer:TextComponent,
      cellStyle:cellStyle
    },
    {
      field: "school_year",
      headerName:"School Year",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle:cellStyle
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
      headerName:"Specialty Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle:cellStyle
    },
    {
      field: "semester_name",
      headerName:"Semester",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle:cellStyle
    },
    {
      field: "start_date",
      headerName:"start Date",
      filter: true,
      floatingFilter: true,
      cellRenderer: DateComponent,
      cellStyle:cellStyle
    },
    {
      field: "end_date",
      headerName:"End Date",
      filter: true,
      floatingFilter: true,
      cellRenderer: DateComponent,
      cellStyle:cellStyle
    },
    {
      field: "school_year",
      headerName:"School Year",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle:cellStyle
    },
    {
      field:"status",
      headerName:"Status",
      filter:true,
      floatingFilter:true,
      cellRenderer:TextComponent,
      cellStyle:cellStyle
    },
    {
      field:"batch_title",
      headerName:"Batch Title",
      filter:true,
      floatingFilter:true,
      cellRenderer:TextComponent,
      cellStyle:cellStyle
    },
    {
      field:"timetable_published",
      headerName:"Publish Status",
      filter:true,
      floatingFilter:true,
      cellRenderer:TextComponent,
      cellStyle:cellStyle
    },
    { 
      field: "Action", 
      cellRenderer: ActionButtonGroup,
      cellStyle: () => ({ width: "20rem" }),
    },
   ];
   return tableConfig;
}
export function tuitionFeeTableConfig({ DropdownComponent }){
  const tableConfig = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "student_name",
      headerName:"Student Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle:cellStyle
    },
    {
      field: "specialty_name",
      headerName:"Specialty Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle:cellStyle
    },
    {
      field: "level_name",
      headerName:"Level Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle:cellStyle
    },
    {
      field: "level_number",
      headerName:"Level",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle:cellStyle
    },
    {
      field: "amount_paid",
      headerName:"Amount Paid",
      filter: true,
      floatingFilter: true,
      cellRenderer: CurrencyComponent,
      cellStyle:cellStyle
    },
    {
      field: "amount_left",
      headerName:"Amount Left",
      filter: true,
      floatingFilter: true,
      cellRenderer: CurrencyComponent,
      cellStyle:cellStyle
    },
    {
      field: "tuition_fee",
      headerName:"Tuition Fee",
      filter: true,
      floatingFilter: true,
      cellRenderer: CurrencyComponent,
      cellStyle:cellStyle
    },
    {
      field: "status",
      headerName:"Payment Status",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle:cellStyle
    },
    { 
      field: "Action", 
      cellRenderer: DropdownComponent,
      cellStyle: () => ({ width: "20rem" }),
    },
   ];
   return tableConfig;
}
export function registrationFeeTableConfig({ DropdownComponent }){
  const tableConfig = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "student_name",
      headerName:"Student Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle:cellStyle
    },
    {
      field: "specialty_name",
      headerName:"Specialty Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle:cellStyle
    },
    {
      field: "level_name",
      headerName:"Level Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle:cellStyle
    },
    {
      field: "level_number",
      headerName:"Level",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle:cellStyle
    },
    {
      field: "amount",
      headerName:"Amount",
      filter: true,
      floatingFilter: true,
      cellRenderer: CurrencyComponent,
      cellStyle:cellStyle
    },
    {
      field: "status",
      headerName:"Payment Status",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle:cellStyle
    },
    { 
      field: "Action", 
      cellRenderer: DropdownComponent,
      cellStyle: () => ({ width: "20rem" }),
    },
   ];
   return tableConfig;
}
export function additionalFeesTableConfig({ DropdownComponent }){
  const tableConfig = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "student_name",
      headerName:"Student Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle:cellStyle
    },
    {
      field: "specialty_name",
      headerName:"Specialty Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle:cellStyle
    },
    {
      field: "level_name",
      headerName:"Level Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle:cellStyle
    },
    {
      field: "level_number",
      headerName:"Level",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle:cellStyle
    },
    {
      field: "amount",
      headerName:"Amount",
      filter: true,
      floatingFilter: true,
      cellRenderer: CurrencyComponent,
      cellStyle:cellStyle
    },
    {
      field: "status",
      headerName:"Payment Status",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle:cellStyle
    },
    {
      field: "category",
      headerName:"Category",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle:cellStyle
    },
    {
      field: "reason",
      headerName:"reason",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle:cellStyle
    },
    { 
      field: "Action", 
      cellRenderer: DropdownComponent,
      cellStyle: () => ({ width: "20rem" }),
    },
   ];
   return tableConfig;
}
export function additionalFeesTransactionsTableConfig({ DropdownComponent }){
  const tableConfig = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "title",
      headerName:"Title",
      filter:true,
      floatingFilter:true,
      cellRenderer:TextComponent,
      cellStyle:cellStyle
    },
    {
      field: "student_name",
      headerName:"Student Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle:cellStyle
    },
    {
      field: "transaction_id",
      headerName:"Transaction ID",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle:cellStyle
    },
    {
      field: "amount",
      headerName:"Amount",
      filter: true,
      floatingFilter: true,
      cellRenderer: CurrencyComponent,
      cellStyle:cellStyle
    },
    {
      field: "amount_paid",
      headerName:"Amount Paid",
      filter: true,
      floatingFilter: true,
      cellRenderer: CurrencyComponent,
      cellStyle:cellStyle
    },
    {
      field: "payment_method",
      headerName:"Payment Method",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle:cellStyle
    },
    {
      field: "status",
      headerName:"Status",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle:cellStyle
    },
    { 
      field: "Action", 
      cellRenderer: DropdownComponent,
      cellStyle: () => ({ width: "20rem" }),
    },
   ];
   return tableConfig;
}
export function tuitionFeesTransactionTableConfig({ DropdownComponent }){
  const tableConfig = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "student_name",
      headerName:"Student Name",
      filter:true,
      floatingFilter:true,
      cellRenderer:TextComponent,
      cellStyle:cellStyle
    },
    {
      field: "specialty_name",
      headerName:"Specialty Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle:cellStyle
    },
    {
      field:"level_name",
      headerName:"Level Name",
      filter:true,
      floatingFilter:true,
      cellRenderer:TextComponent,
      cellStyle:cellStyle
    },
    {
      field:"level_number",
      headerName:"Level",
      filter:true,
      floatingFilter:true,
      cellRenderer:TextComponent,
      cellStyle:cellStyle
    },
    {
      field: "transaction_id",
      headerName:"Transaction ID",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle:cellStyle
    },
    {
      field: "amount",
      headerName:"Amount",
      filter: true,
      floatingFilter: true,
      cellRenderer: CurrencyComponent,
      cellStyle:cellStyle
    },
    {
      field: "payment_method",
      headerName:"Payment Method",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle:cellStyle,
    },
    { field: "Action",
       cellRenderer: DropdownComponent,  
       cellStyle: {
          width:"20rem"
         }
    },
   ];
   return tableConfig;
}
export function registrationFeeTransactionTableConfig({ DropdownComponent }){
  const tableConfig = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "student_name",
      headerName:"Student Name",
      filter:true,
      floatingFilter:true,
      cellRenderer:TextComponent,
      cellStyle:cellStyle
    },
    {
      field: "specialty_name",
      headerName:"Specialty Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle:cellStyle
    },
    {
      field:"level_name",
      headerName:"Level Name",
      filter:true,
      floatingFilter:true,
      cellRenderer:TextComponent,
      cellStyle:cellStyle
    },
    {
      field:"level_number",
      headerName:"Level",
      filter:true,
      floatingFilter:true,
      cellRenderer:TextComponent,
      cellStyle:cellStyle
    },
    {
      field: "transaction_id",
      headerName:"Transaction ID",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle:cellStyle
    },
    {
      field: "amount",
      headerName:"Amount",
      filter: true,
      floatingFilter: true,
      cellRenderer: CurrencyComponent,
      cellStyle:cellStyle
    },
    {
      field: "payment_method",
      headerName:"Payment Method",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle:cellStyle,
    },
    { field: "Action",
       cellRenderer: DropdownComponent,  
       cellStyle: {
          width:"20rem"
         }
    },
   ];
   return tableConfig;
}
export function resitFeeTransactionsTableConfig({ DropdownComponent }){
  const tableConfig = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "student_name",
      headerName:"Student Name",
      filter:true,
      floatingFilter:true,
      cellRenderer:TextComponent,
      cellStyle:cellStyle
    },
    {
      field: "specialty_name",
      headerName:"Specialty Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle:cellStyle
    },
    {
      field:"level_name",
      headerName:"Level Name",
      filter:true,
      floatingFilter:true,
      cellRenderer:TextComponent,
      cellStyle:cellStyle
    },
    {
      field:"level_number",
      headerName:"Level",
      filter:true,
      floatingFilter:true,
      cellRenderer:TextComponent,
      cellStyle:cellStyle
    },
    {
      field: "transaction_id",
      headerName:"Transaction ID",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle:cellStyle
    },
    {
      field: "amount",
      headerName:"Amount",
      filter: true,
      floatingFilter: true,
      cellRenderer: CurrencyComponent,
      cellStyle:cellStyle
    },
    {
      field: "payment_method",
      headerName:"Payment Method",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle:cellStyle,
    },
    { field: "Action",
       cellRenderer: DropdownComponent,  
       cellStyle: {
          width:"20rem"
         }
    },
   ];
   return tableConfig;
}

export function electionTableConfig({ DropdownComponent }){
  const tableConfig = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "title",
      headerName:"Title",
      filter:true,
      floatingFilter:true,
      cellRenderer:TextComponent,
      cellStyle:cellStyle
    },
    {
      field: "start_date",
      headerName:"Start Date",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle:cellStyle
    },
    {
      field:"end_date",
      headerName:"End Date",
      filter:true,
      floatingFilter:true,
      cellRenderer:TextComponent,
      cellStyle:cellStyle
    },
    {
      field:"start_time",
      headerName:"Start Time",
      filter:true,
      floatingFilter:true,
      cellRenderer:TextComponent,
      cellStyle:cellStyle
    },
    {
      field: "end_time",
      headerName:"End Time",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle:cellStyle
    },
    {
      field: "description",
      headerName:"Description",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle:cellStyle
    },
    { field: "Action",
       cellRenderer: DropdownComponent,  
       cellStyle: {
          width:"20rem"
         }
    },
   ];
   return tableConfig;
}
export function electionApplicationTableConfig({ DropdownComponent }){
    const tableConfig = [
      {
        field: "id",
        hide: true,
      },
      {
        field: "student_name",
        headerName:"Student Name",
        filter:true,
        floatingFilter:true,
        cellRenderer:TextComponent,
        cellStyle:cellStyle
      },
      {
        field: "election_title",
        headerName:"Election Title",
        filter: true,
        floatingFilter: true,
        cellRenderer: TextComponent,
        cellStyle:cellStyle
      },
      {
        field:"election_role",
        headerName:"Role",
        filter:true,
        floatingFilter:true,
        cellRenderer:TextComponent,
        cellStyle:cellStyle
      },
      {
        field:"status",
        headerName:"Status",
        filter:true,
        floatingFilter:true,
        cellRenderer:TextComponent,
        cellStyle:cellStyle
      },
      {
        field: "personal_vision",
        headerName:"Personal Vision",
        filter: true,
        floatingFilter: true,
        cellRenderer: TextComponent,
        cellStyle:cellStyle
      },
      {
        field: "commitment_statement",
        headerName:"Commitment Statement",
        filter: true,
        floatingFilter: true,
        cellRenderer: TextComponent,
        cellStyle:cellStyle
      },
      { field: "Action",
         cellRenderer: DropdownComponent,  
         cellStyle: {
            width:"20rem"
           }
      },
    ]
    return tableConfig;
}
export function electionRolesTableConfig({ DropdownComponent }){
  const tableConfig = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "name",
      headerName:"Role Title",
      filter:true,
      floatingFilter:true,
      cellRenderer:TextComponent,
      cellStyle:cellStyle
    },
    {
      field: "election_title",
      headerName:"Election Title",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle:cellStyle
    },
    {
      field:"status",
      headerName:"Status",
      filter:true,
      floatingFilter:true,
      cellRenderer:TextComponent,
      cellStyle:cellStyle
    },
    {
      field:"description",
      headerName:"Description",
      filter:true,
      floatingFilter:true,
      cellRenderer:TextComponent,
      cellStyle:cellStyle
    },
    { field: "Action",
       cellRenderer: DropdownComponent,  
       cellStyle: {
          width:"20rem"
         }
    },
  ]
  return tableConfig;
}
export function hodTableConfig({ ActionButtonGroup  }){
  const tableConfig = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "full_names",
      headerName:"Full Names",
      filter:true,
      floatingFilter:true,
      cellRenderer:TextComponent,
      cellStyle:cellStyle
    },
    {
      field: "first_name",
      headerName:"First Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle:cellStyle
    },
    {
      field:"last_name",
      headerName:"Last Name",
      filter:true,
      floatingFilter:true,
      cellRenderer:TextComponent,
      cellStyle:cellStyle
    },
    {
      field:"department_name",
      headerName:"Department Name",
      filter:true,
      floatingFilter:true,
      cellRenderer:TextComponent,
      cellStyle:cellStyle
    },
    {
      field:"department_status",
      headerName:"Department Status",
      filter:true,
      floatingFilter:true,
      cellRenderer:TextComponent,
      cellStyle:cellStyle
    },
    { field: "Action",
       cellRenderer: ActionButtonGroup,  
       cellStyle: {
          width:"20rem"
         }
    },
  ];
  return tableConfig;
}
export function hosTableConfig({ ActionButtonGroup }){
  const tableConfig = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "full_names",
      headerName:"Full Names",
      filter:true,
      floatingFilter:true,
      cellRenderer:TextComponent,
      cellStyle:cellStyle
    },
    {
      field: "first_name",
      headerName:"First Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle:cellStyle
    },
    {
      field:"last_name",
      headerName:"Last Name",
      filter:true,
      floatingFilter:true,
      cellRenderer:TextComponent,
      cellStyle:cellStyle
    },
    {
      field:"specialty_name",
      headerName:"Specialty Name",
      filter:true,
      floatingFilter:true,
      cellRenderer:TextComponent,
      cellStyle:cellStyle
    },
    {
      field:"specialty_status",
      headerName:"Specialty Status",
      filter:true,
      floatingFilter:true,
      cellRenderer:TextComponent,
      cellStyle:cellStyle
    },
    {
      field:"level_name",
      headerName:"Level Title",
      filter:true,
      floatingFilter:true,
      cellRenderer:TextComponent,
      cellStyle:cellStyle
    },
    {
      field:"level",
      headerName:"Level Title",
      filter:true,
      floatingFilter:true,
      cellRenderer:TextComponent,
      cellStyle:cellStyle
    },
    { field: "Action",
       cellRenderer: ActionButtonGroup,  
       cellStyle: {
          width:"20rem"
         }
    },
  ];
  return tableConfig;
}

export function studentResultsTableConfig({ DropdownComponent }){
  const tableConfig = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "student_name",
      headerName:"Student Name",
      filter:true,
      floatingFilter:true,
      cellRenderer:TextComponent,
      cellStyle:cellStyle
    },
    {
      field: "specialty_name",
      headerName:"Specialty Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle:cellStyle
    },
    {
      field:"level_name",
      headerName:"Level Name",
      filter:true,
      floatingFilter:true,
      cellRenderer:TextComponent,
      cellStyle:cellStyle
    },
    {
      field:"level_number",
      headerName:"Level Number",
      filter:true,
      floatingFilter:true,
      cellRenderer:TextComponent,
      cellStyle:cellStyle
    },
    {
      field:"exam_name",
      headerName:"Exam Name",
      filter:true,
      floatingFilter:true,
      cellRenderer:TextComponent,
      cellStyle:cellStyle
    },
    {
      field:"gpa",
      headerName:"GPA",
      filter:true,
      floatingFilter:true,
      cellRenderer:TextComponent,
      cellStyle:cellStyle
    },
    { field: "Action",
       cellRenderer: DropdownComponent,  
       cellStyle: {
          width:"20rem"
         }
    },
  ];
  return tableConfig;
}

export function AccessedResitCandidateTableConfig({ DropdownComponent }){
  const tableConfig = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "student_name",
      headerName:"Student Name",
      filter:true,
      floatingFilter:true,
      cellRenderer:TextComponent,
      cellStyle:cellStyle
    },
    {
      field: "exam_name",
      headerName:"Exam Title",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle:cellStyle
    },
    {
      field: "specialty_name",
      headerName:"Specialty",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle:cellStyle
    },
    {
      field: "level_name",
      headerName:"Level Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle:cellStyle
    },
    {
      field: "level",
      headerName:"level",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle:cellStyle
    },
    {
      field:"grades_submitted",
      headerName:"Grades Submitted",
      filter:true,
      floatingFilter:true,
      cellRenderer:TextComponent,
      cellStyle:cellStyle
    },
    {
      field:"student_accessed",
      headerName:"Student Accessed",
      filter:true,
      floatingFilter:true,
      cellRenderer:TextComponent,
      cellStyle:cellStyle
    },
    {
      field:"weighted_mark",
      headerName:"Max Score",
      filter:true,
      floatingFilter:true,
      cellRenderer:TextComponent,
      cellStyle:cellStyle
    },
    { field: "Action",
       cellRenderer: DropdownComponent,  
       cellStyle: {
          width:"20rem"
         }
    },
  ];
  return tableConfig;
}

export function StudentDropOutTableConfig({ DropdownComponent }){
  const tableConfig = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "student_name",
      headerName:"Student Name",
      filter:true,
      floatingFilter:true,
      cellRenderer:TextComponent,
      cellStyle:cellStyle
    },
    {
      field: "department_name",
      headerName:"Department Title",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle:cellStyle
    },
    {
      field: "specialty_title",
      headerName:"Specialty",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle:cellStyle
    },
    {
      field: "level_name",
      headerName:"Level Name",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle:cellStyle
    },
    {
      field: "level",
      headerName:"level",
      filter: true,
      floatingFilter: true,
      cellRenderer: TextComponent,
      cellStyle:cellStyle
    },
    {
      field:"reason",
      headerName:"Reason",
      filter:true,
      floatingFilter:true,
      cellRenderer:TextComponent,
      cellStyle:cellStyle
    },
    { field: "Action",
       cellRenderer: DropdownComponent,  
       cellStyle: {
          width:"20rem"
         }
    },
  ];
  return tableConfig;
}
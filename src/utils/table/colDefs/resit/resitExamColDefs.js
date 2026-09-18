import {
  textColumn,
  actionsColumn,
  dateColumn,
  numberColumn,
} from "@/utils/table/columns";
import TextComponent from "../../../../components/DataTableComponents/TextComponent";
import GradesConfigTableBadge from "../../../../components/Badges/GradesConfigTableBadge";
import ExamStatusRenderer from "../../../../components/Badges/ExamStatusRenderer";


export function resitExamColDefs({ ActionComponent }) {
  return [
    textColumn({
      field: "exam_name",
      headerName: "Exam Name",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "school_year",
      headerName: "Academic Year",
      hide: false,
      cellRenderer: TextComponent,
    }),
    dateColumn({
      field: "start_date",
      headerName: "Start Date",
      format: "dd/MM/yyyy",
      hide: false,
    }),
    dateColumn({
      field: "end_date",
      headerName: "End Date",
      format: "dd/MM/yyyy",
      hide: false,
    }),
    textColumn({
      field: "exam_type",
      headerName: "Exam Type",
      hide: true,
      cellRenderer: TextComponent,
    }),
    numberColumn({
      field: "max_score",
      headerName: "Score",
      hide: false,
    }),
    textColumn({
      field: "semester_name",
      headerName: "Semester",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "specialty_name",
      headerName: "Specialty",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "level_name",
      headerName: "Level Name",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "level_number",
      headerName: "Level Number",
      hide: true,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "status",
      headerName: "Status",
      hide: false,
      cellRenderer: ExamStatusRenderer,
    }),
    textColumn({
      field: "timetable_published",
      headerName: "Timetable Status",
      hide: true,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "is_grade_scale_configured",
      headerName: "Grade Scale Status",
      hide: true,
      cellRenderer: GradesConfigTableBadge,
    }),
    numberColumn({
       field:"candidates",
       headerName:"Candidates",
       hide: true, 
    }),
    dateColumn({
      field: "created_at",
      headerName: "Created At",
      format: "dd/MM/yyyy",
      hide: true,
      cellRenderer: TextComponent,
    }),
    dateColumn({
      field: "updated_at",
      headerName: "Updated At",
      format: "dd/MM/yyyy",
      hide: true,
      cellRenderer: TextComponent,
    }),
    actionsColumn({
      cellRenderer: ActionComponent,
    }),
  ];
}

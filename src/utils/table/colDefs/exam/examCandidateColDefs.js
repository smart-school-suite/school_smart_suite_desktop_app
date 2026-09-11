import { textColumn, actionsColumn } from "@/utils/table/columns";
import TextComponent from "../../../../components/DataTableComponents/TextComponent";
import GradeSubmittedStatus from "../../../../components/Badges/GradeSubmittedStatus";

export function examCandidateColDefs({ ActionComponent }) {
  return [
    textColumn({
      field: "student_name",
      headerName: "Student Name",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "specialty_name",
      headerName: "Specialty Name",
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
      headerName: "Level",
      hide: true,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "exam_name",
      headerName: "Exam Name",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "exam_type",
      headerName: "Exam Type",
      hide: true,
      cellRenderer: TextComponent,
    }),
     textColumn({
      field: "semester",
      headerName: "Semester",
      hide: true,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "is_student_evaluated",
      headerName: "Evaluation Status",
      hide: false,
      cellRenderer: GradeSubmittedStatus,
    }),
    textColumn({
      field: "academic_year",
      headerName: "Academic Year",
      hide: false,
      cellRenderer: TextComponent,
    }),
    actionsColumn({
      cellRenderer: ActionComponent,
    }),
  ];
}

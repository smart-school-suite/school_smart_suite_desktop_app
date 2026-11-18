import {
  actionsColumn,
  dateColumn,
  numberColumn,
  textColumn,
} from "@/utils/table/columns";
import ExamStatusRenderer from "../../../../components/Badges/ExamStatusRenderer";
import GradesConfigTableBadge from "../../../../components/Badges/GradesConfigTableBadge";
import TextComponent from "../../../../components/DataTableComponents/TextComponent";
import ResitResultPublicationStatusRenderer from "../../../../components/Renderer/ResitResult/ResitResultPublicationStatusRenderer";

/** Columns of the resit results table, like examResultColDefs. */
export function resitResultColDefs({ ActionComponent }) {
  return [
    textColumn({ field: "exam_name", headerName: "Resit Exam", hide: false, cellRenderer: TextComponent }),
    textColumn({ field: "school_year", headerName: "Academic Year", hide: false, cellRenderer: TextComponent }),
    dateColumn({ field: "start_date", headerName: "Start Date", format: "dd/MM/yyyy", hide: true }),
    dateColumn({ field: "end_date", headerName: "End Date", format: "dd/MM/yyyy", hide: true }),
    numberColumn({ field: "total_candidates", headerName: "Total Candidates", hide: false }),
    textColumn({
      field: "publication_status",
      headerName: "Publication Status",
      hide: false,
      cellRenderer: ResitResultPublicationStatusRenderer,
    }),
    numberColumn({ field: "evaluated_candidates", headerName: "Evaluated Candidates", hide: true }),
    numberColumn({ field: "not_evaluated_candidates", headerName: "UnEvaluated Candidates", hide: true }),
    dateColumn({ field: "published_at", headerName: "Published At", format: "dd/MM/yyyy", hide: true }),
    numberColumn({ field: "max_score", headerName: "Score", hide: true }),
    textColumn({ field: "semester_name", headerName: "Semester", hide: false, cellRenderer: TextComponent }),
    textColumn({ field: "specialty_name", headerName: "Specialty", hide: false, cellRenderer: TextComponent }),
    textColumn({ field: "level_name", headerName: "Level Name", hide: false, cellRenderer: TextComponent }),
    textColumn({ field: "level_number", headerName: "Level Number", hide: true, cellRenderer: TextComponent }),
    textColumn({ field: "status", headerName: "Status", hide: true, cellRenderer: ExamStatusRenderer }),
    textColumn({
      field: "is_grade_scale_configured",
      headerName: "Grade Scale Status",
      hide: true,
      cellRenderer: GradesConfigTableBadge,
    }),
    dateColumn({ field: "created_at", headerName: "Created At", format: "dd/MM/yyyy", hide: true, cellRenderer: TextComponent }),
    dateColumn({ field: "updated_at", headerName: "Updated At", format: "dd/MM/yyyy", hide: true, cellRenderer: TextComponent }),
    actionsColumn({ cellRenderer: ActionComponent }),
  ];
}

export default resitResultColDefs;

import { BadgeRenderer, BADGE_CONTEXT } from "@/components/Renderer/badges";
import {
  actionsColumn,
  dateColumn,
  numberColumn,
  textColumn,
} from "@/utils/table/columns";
import TextComponent from "../../../../components/DataTableComponents/TextComponent";
export function examResultColDefs({ ActionComponent }) {
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
      hide: true,
    }),
    dateColumn({
      field: "end_date",
      headerName: "End Date",
      format: "dd/MM/yyyy",
      hide: true,
    }),
    textColumn({
      field: "exam_type",
      headerName: "Exam Type",
      hide: true,
      cellRenderer: TextComponent,
    }),
    numberColumn({
      field: "total_candidates",
      headerName: "Total Candidates",
      hide: false,
    }),
    textColumn({
      field: "publication_status",
      headerName: "Publication Status",
      hide: false,
      cellRenderer: BadgeRenderer,
      cellRendererParams: { context: BADGE_CONTEXT.RESULT_PUBLICATION },
    }),
    numberColumn({
      field: "evaluated_candidates",
      headerName: "Evaluated Candidates",
      hide: true,
    }),
    numberColumn({
      field: "not_evaluated_candidates",
      headerName: "UnEvaluated Candidates",
      hide: true,
    }),
    numberColumn({
      field: "max_score",
      headerName: "Score",
      hide: true,
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
      hide: true,
      cellRenderer: BadgeRenderer,
    }),
    textColumn({
      field: "timetable_published",
      headerName: "Timetable Status",
      hide: true,
      cellRenderer: BadgeRenderer,
      cellRendererParams: { context: BADGE_CONTEXT.TIMETABLE_PUBLICATION },
    }),
    textColumn({
      field: "is_grade_scale_configured",
      headerName: "Grade Scale Status",
      hide: true,
      cellRenderer: BadgeRenderer,
      cellRendererParams: { context: BADGE_CONTEXT.CONFIGURATION },
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

export default examResultColDefs;

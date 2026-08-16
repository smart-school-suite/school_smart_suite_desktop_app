import {
  textColumn,
  actionsColumn,
  dateColumn,
  numberColumn,
} from "@/utils/table/columns";
import SpecailtyTableBadge from "../../../../components/Badges/SpecialtyTableBadge";
import TextComponent from "../../../../components/DataTableComponents/TextComponent";
import CurrencyComponent from "../../../../components/DataTableComponents/CurrencyComponent";
import DepartmentTableBadge from "../../../../components/Badges/DepartmentTableBadge";
import ActiveInactiveBadge from "../../../../components/Badges/ActiveInactive";
import GradesConfigTableBadge from "../../../../components/Badges/GradesConfigTableBadge";

export function examColDefs({ ActionComponent }) {
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
      field: "weighted_mark",
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
      field: "batch_title",
      headerName: "Batch",
      hide: true,
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
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "timetable_published",
      headerName: "Timetable Status",
      hide: true,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "isgrades_configured",
      headerName: "Config Status",
      hide: true,
      cellRenderer: GradesConfigTableBadge,
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

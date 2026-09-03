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

export function gradeScaleColDefs({ ActionComponent }) {
  return [
    textColumn({
      field: "grade_title",
      headerName: "Grade Title",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "exam_type",
      headerName: "Exam Type",
      hide: false,
      cellRenderer: TextComponent,
    }),
    numberColumn({
      field: "max_score",
      headerName: "Exam Score",
      hide: false,
    }),
    textColumn({
      field: "status",
      headerName: "Status",
      hide: false,
      cellRenderer: ActiveInactiveBadge,
    }),
    textColumn({
      field: "is_configured",
      headerName: "Config Status",
      hide: false,
      cellRenderer: GradesConfigTableBadge,
    }),
    dateColumn({
      field: "created_at",
      headerName: "Created At",
      format: "dd/MM/yyyy",
      hide: false,
    }),
    dateColumn({
      field: "updated_at",
      headerName: "Updated At",
      format: "dd/MM/yyyy",
      hide: false,
    }),
    actionsColumn({
      cellRenderer: ActionComponent,
    }),
  ];
}

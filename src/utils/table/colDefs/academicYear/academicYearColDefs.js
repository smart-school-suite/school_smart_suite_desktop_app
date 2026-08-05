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

export function academicYearColDefs({ ActionComponent }) {
  return [
    textColumn({
      field: "specialty_name",
      headerName: "Specialty",
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
      field: "school_year",
      headerName: "Academic Year",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "status",
      headerName: "Status",
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
    numberColumn({
      field: "year_start",
      headerName: "Year Start",
      hide: false,
    }),
     numberColumn({
      field: "year_start",
      headerName: "Year Start",
      hide: false,
    }),
    dateColumn({
      field: "created_at",
      headerName: "Created At",
      format: "dd/MM/yyyy",
      hide: true,
    }),
    dateColumn({
      field: "updated_at",
      headerName: "Updated At",
      format: "dd/MM/yyyy",
      hide: true,
    }),
    actionsColumn({
      cellRenderer: ActionComponent,
    }),
  ];
}

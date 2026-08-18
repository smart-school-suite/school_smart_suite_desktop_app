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

export function studentBatchColDefs({ ActionComponent }) {
  return [
    textColumn({
      field: "name",
      headerName: "Batch Name",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "description",
      headerName: "Description",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "status",
      headerName: "Status",
      hide: false,
      cellRenderer: DepartmentTableBadge,
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

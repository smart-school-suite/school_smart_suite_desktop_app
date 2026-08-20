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
import ActionComponent from "../../../../components/Badges/ActivationCode/ActionComponent";
export function activationCodeColDefs() {
  return [
    textColumn({
      field: "code",
      headerName: "Code",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "code_type",
      headerName: "Code Type",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "code_type",
      headerName: "Code Type",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "used",
      headerName: "Used Status",
      hide: false
    }),
    textColumn({
      headerName: "Status",
      field: "status",
      hide: false,
      cellRenderer: TextComponent,
    }),
    dateColumn({
      field: "expires_at",
      headerName: "Expire Date",
      format: "dd/MM/yyyy",
      hide: false,
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

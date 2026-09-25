import { textColumn, dateColumn } from "@/utils/table/columns";
import TextComponent from "../../../../components/DataTableComponents/TextComponent";
import UsageStatus from "../../../../components/Badges/ActivationCode/UsageStatus";

export function activationCodeUsageColDefs() {
  return [
    textColumn({
      field: "code",
      headerName: "Code",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "account_type",
      headerName: "Account Type",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "status",
      headerName: "Status",
      hide: false,
      cellRenderer: UsageStatus,
    }),
    textColumn({
      field: "account_name",
      headerName: "Account Name",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "user_name",
      headerName: "Username",
      hide: false,
      cellRenderer: TextComponent,
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
  ];
}

import {
  textColumn,
  actionsColumn,
  dateColumn,
  numberColumn,
} from "@/utils/table/columns";
import TextComponent from "../../../../components/DataTableComponents/TextComponent";
import CurrencyComponent from "../../../../components/DataTableComponents/CurrencyComponent";
import RegistrationFeeTableBadge from "../../../../components/Badges/RegistrationFeeTableBadge";

export function registrationFeeColDefs({ ActionComponent }) {
  return [
    textColumn({
      field: "title",
      headerName: "Title",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "student_name",
      headerName: "Student",
      hide: false,
      cellRenderer: TextComponent,
    }),
     textColumn({
      field: "specialty",
      headerName: "specialty",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "level_name",
      headerName: "Level",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "level_number",
      headerName: "Level Number",
      hide: false,
      cellRenderer: TextComponent,
    }),
    numberColumn({
      field: "amount",
      headerName: "Amount",
      hide: false,
      cellRenderer: CurrencyComponent,
    }),
    textColumn({
      field: "Payment Status",
      headerName: "Status",
      hide: false,
      cellRenderer: RegistrationFeeTableBadge,
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

import {
  textColumn,
  actionsColumn,
  dateColumn,
  numberColumn,
} from "@/utils/table/columns";
import TextComponent from "../../../../components/DataTableComponents/TextComponent";
import CurrencyComponent from "../../../../components/DataTableComponents/CurrencyComponent";

export function registrationFeeTransactionColDefs({ ActionComponent }) {
  return [
    textColumn({
      field: "transaction_id",
      headerName: "Transaction Id",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "payment_method",
      headerName: "Payment Method",
      hide: false,
      cellRenderer: TextComponent,
    }),
    numberColumn({
      field: "amount",
      headerName: "Amount",
      hide: false,
      cellRenderer: CurrencyComponent,
    }),
      numberColumn({
      field: "registration_fee",
      headerName: "Registration Fee",
      hide: false,
      cellRenderer: CurrencyComponent,
    }),
    textColumn({
      field: "student_name",
      headerName: "Student",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "specialty_name",
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
      hide: true,
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
    actionsColumn({
      cellRenderer: ActionComponent,
    }),
  ];
}

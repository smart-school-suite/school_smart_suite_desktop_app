import {
  textColumn,
  actionsColumn,
  dateColumn,
  numberColumn,
} from "@/utils/table/columns";
import TextComponent from "../../../../components/DataTableComponents/TextComponent";
import CurrencyComponent from "../../../../components/DataTableComponents/CurrencyComponent";
export function resitFeeTransactionColDefs({ ActionComponent }) {
  return [
    textColumn({
      field: "transaction_id",
      headerName: "Transaction Id",
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
      field: "resit_fee",
      headerName: "Resit Fee",
      hide: false,
      cellRenderer: CurrencyComponent,
    }),
    textColumn({
      field: "payment_method",
      headerName: "Payment Method",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "course_title",
      headerName: "Course Title",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "student_name",
      headerName: "Student Name",
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
    dateColumn({
      field: "created_at",
      headerName: "Created At",
      hide: true,
    }),
    dateColumn({
      field: "updated_at",
      headerName: "Updated At",
      hide: true,
    }),
    actionsColumn({
      cellRenderer: ActionComponent,
    }),
  ];
}

import {
  textColumn,
  dateColumn,
  numberColumn,
} from "@/utils/table/columns";
import TextComponent from "../../../../components/DataTableComponents/TextComponent";
import CurrencyComponent from "../../../../components/DataTableComponents/CurrencyComponent";
import TransactionStatus from "../../../../components/Badges/ActivationCode/TransactionStatus";
export function activationCodeTransactionColDefs() {
  return [
    textColumn({
      field: "type",
      headerName: "Type",
      hide: false,
      cellRenderer: TextComponent,
    }),
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
      headerName: "Amount Paid",
      hide: false,
      cellRenderer: CurrencyComponent,
    }),
    textColumn({
      field: "payment_ref",
      headerName: "Payment Ref",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "status",
      headerName: "Transaction Status",
      hide: false,
      cellRenderer: TransactionStatus,
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
    })
  ];
}

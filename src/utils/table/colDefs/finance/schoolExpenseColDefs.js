import {
  textColumn,
  actionsColumn,
  dateColumn,
  numberColumn,
} from "@/utils/table/columns";
import TextComponent from "../../../../components/DataTableComponents/TextComponent";
import CurrencyComponent from "../../../../components/DataTableComponents/CurrencyComponent";
export function schoolExpenseColDefs({ ActionComponent }) {
  return [
     textColumn({
      field: "category_name",
      headerName: "Category",
      hide: false,
      cellRenderer: TextComponent,
    }),
     textColumn({
      field: "description",
      headerName: "Description",
      hide: false,
      cellRenderer: TextComponent,
    }),
    dateColumn({
      field: "date",
      headerName: "Date Incurred",
      format: "dd/MM/yyyy",
      hide: false,
    }),
    numberColumn({
      field: "amount",
      headerName: "Amount Paid",
      hide: false,
      cellRenderer: CurrencyComponent,
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

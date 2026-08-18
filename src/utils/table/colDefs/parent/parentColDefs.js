import {
  textColumn,
  actionsColumn,
  dateColumn,
  numberColumn,
} from "@/utils/table/columns";
import SpecailtyTableBadge from "../../../../components/Badges/SpecialtyTableBadge";
import TextComponent from "../../../../components/DataTableComponents/TextComponent";
import CurrencyComponent from "../../../../components/DataTableComponents/CurrencyComponent";

export function parentColDefs({ ActionComponent }) {
  return [
    textColumn({
      field: "guardian_name",
      headerName: "Guardian Name",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "address",
      headerName: "Address",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "phone",
      headerName: "Phone",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "total_students",
      headerName: "Total Students",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "contact_method",
      headerName: "Contact Method",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "language",
      headerName: "Language",
      hide: false,
      cellRenderer: TextComponent,
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

import {
  textColumn,
  actionsColumn,
  dateColumn,
  numberColumn,
} from "@/utils/table/columns";
import SpecailtyTableBadge from "../../../../components/Badges/SpecialtyTableBadge";
import TextComponent from "../../../../components/DataTableComponents/TextComponent";
import CurrencyComponent from "../../../../components/DataTableComponents/CurrencyComponent";

export function specialtyColDefs({ ActionComponent }) {
  return [
    textColumn({
      field: "specialty_name",
      headerName: "Specialty Name",
      hide: false,
      cellRenderer: TextComponent,
    }),
    numberColumn({
      field: "registration_fee",
      headerName: "Registration Fee",
      hide: false,
      cellRenderer: CurrencyComponent,
    }),
    numberColumn({
      field: "tuition_fee",
      headerName: "Tuition Fee",
      hide: false,
      cellRenderer: CurrencyComponent,
    }),
    numberColumn({
      field: "total",
      headerName: "Total",
      hide: false,
      cellRenderer: CurrencyComponent,
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
    textColumn({
      field:"description",
      headerName:"Description",
      hide: true,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field:"department",
      headerName:"Department",
      hide: true,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "status",
      headerName: "Status",
      cellRenderer: SpecailtyTableBadge,
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

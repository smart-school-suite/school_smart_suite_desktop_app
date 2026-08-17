import {
  textColumn,
  actionsColumn,
  dateColumn,
  numberColumn,
} from "@/utils/table/columns";
import SpecailtyTableBadge from "../../../../components/Badges/SpecialtyTableBadge";
import TextComponent from "../../../../components/DataTableComponents/TextComponent";
import CurrencyComponent from "../../../../components/DataTableComponents/CurrencyComponent";

export function specialtyImportColDefs() {
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
      cellRenderer: TextComponent,
    }),
    numberColumn({
      field: "school_fee",
      headerName: "Tuition Fee",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "level",
      headerName: "Level",
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
      field: "description",
      headerName: "Description",
      hide: true,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "department_name",
      headerName: "Department",
      hide: true,
      cellRenderer: TextComponent,
    })
  ];
}

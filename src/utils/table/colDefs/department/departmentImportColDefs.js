import {
  textColumn,
  actionsColumn,
  dateColumn,
  numberColumn,
} from "@/utils/table/columns";
import TextComponent from "../../../../components/DataTableComponents/TextComponent";

export function departmentImportColDefs() {
  return [
    textColumn({
      field: "department_name",
      headerName: "department_name",
      cellRenderer: TextComponent,
    }),

    textColumn({
      field: "description",
      headerName: "Description",
      cellRenderer: TextComponent,
    })
  ];
}

import {
  textColumn,
  actionsColumn,
  dateColumn,
  numberColumn,
} from "@/utils/table/columns";
import TextComponent from "../../../../components/DataTableComponents/TextComponent";
import RepeatableGroupRenderer from "../../../../components/DataTableComponents/RepeatableGroupRenderer";
export function hallImportColDefs() {
  return [
    textColumn({
      field: "name",
      headerName: "Hall Name",
      hide: false,
      cellRenderer: TextComponent,
    }),
    numberColumn({
      field: "capacity",
      headerName: "Hall Capacity",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "location",
      headerName: "Hall Location",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "types",
      headerName: "Hall Types",
      cellRenderer: RepeatableGroupRenderer,
      cellRendererParams: {
        label: "Hall Type",
        displayFields: ["type"],
        maxVisible: 2,
      },
    }),
  ];
}

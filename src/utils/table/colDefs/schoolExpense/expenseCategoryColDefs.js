import { BadgeRenderer } from "@/components/Renderer/badges";
import {
  textColumn,
  actionsColumn,
  dateColumn
} from "@/utils/table/columns";
import TextComponent from "../../../../components/DataTableComponents/TextComponent";
export function expenseCategoryColDefs({ ActionComponent }) {
  return [
    textColumn({
      field: "name",
      headerName: "Title",
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
      field: "status",
      headerName: "Status",
      hide: false,
      cellRenderer: BadgeRenderer,
    }),
    dateColumn({
      field: "created_at",
      headerName: "Created At",
      hide: false,
    }),
    dateColumn({
      field: "updated_at",
      headerName: "Updated At",
      hide: false,
    }),
    actionsColumn({
      cellRenderer: ActionComponent,
    }),
  ];
}

import {
  textColumn,
  actionsColumn,
  dateColumn,
  numberColumn,
} from "@/utils/table/columns";
import TextComponent from "../../../../components/DataTableComponents/TextComponent";
import DepartmentTableBadge from "../../../../components/Badges/DepartmentTableBadge";
export function announcementCategoryColDefs({ ActionComponent }) {
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
      cellRenderer: DepartmentTableBadge,
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

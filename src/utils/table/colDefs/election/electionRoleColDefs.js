import {
  textColumn,
  actionsColumn,
  dateColumn,
} from "@/utils/table/columns";
import TextComponent from "../../../../components/DataTableComponents/TextComponent";
import DepartmentTableBadge from "../../../../components/Badges/DepartmentTableBadge";

export function electionRoleColDefs({ ActionComponent }) {
  return [
    textColumn({
      field: "role_title",
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
      field: "election_type",
      headerName: "Election Type",
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
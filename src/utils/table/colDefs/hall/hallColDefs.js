import { BadgeRenderer } from "@/components/Renderer/badges";
import {
  actionsColumn,
  dateColumn,
  numberColumn,
  textColumn,
} from "@/utils/table/columns";
import TextComponent from "../../../../components/DataTableComponents/TextComponent";
export function hallColDefs({ ActionComponent }) {
  return [
    textColumn({
      field: "name",
      headerName: "Hall Name",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "location",
      headerName: "Location",
      hide: false,
      cellRenderer: TextComponent,
    }),
    numberColumn({
      field: "capacity",
      headerName: "Capacity",
      hide: false,
    }),
    numberColumn({
      field: "num_assigned_specialties",
      headerName: "Assigned Specialties",
      hide: false,
    }),
    textColumn({
      field: "assignment_status",
      headerName: "Assignment Status",
      hide: false,
      cellRenderer: BadgeRenderer,
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

import {
  textColumn,
  actionsColumn,
  dateColumn,
  numberColumn,
} from "@/utils/table/columns";
import SpecailtyTableBadge from "../../../../components/Badges/SpecialtyTableBadge";
import TextComponent from "../../../../components/DataTableComponents/TextComponent";
import CurrencyComponent from "../../../../components/DataTableComponents/CurrencyComponent";
import ActiveInactiveBadge from "../../../../components/Badges/ActiveInactive";
import AssignmentPill from "../../../../components/Badges/AssignmentStatus";

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
      cellRenderer: AssignmentPill,
    }),
    textColumn({
      field: "status",
      headerName: "Status",
      hide: false,
      cellRenderer: ActiveInactiveBadge,
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

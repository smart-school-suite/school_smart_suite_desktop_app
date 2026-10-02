import { textColumn, actionsColumn, dateColumn } from "@/utils/table/columns";
import TextComponent from "../../../../components/DataTableComponents/TextComponent";
import DepartmentTableBadge from "../../../../components/Badges/DepartmentTableBadge";

export function electionColDef({ ActionComponent }) {
  return [
    textColumn({
      field: "election_title",
      headerName: "Election",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "school_year",
      headerName: "Academic Year",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "application_status",
      headerName: "Application Status",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "voting_status",
      headerName: "Vote Status",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "status",
      headerName: "Election Status",
      hide: false,
      cellRenderer: TextComponent,
    }),
    dateColumn({
      field: "application_start",
      headerName: "Appication Start",
      hide: false,
    }),
    dateColumn({
      field: "application_end",
      headerName: "Appication End",
      hide: false,
    }),
    dateColumn({
      field: "vote_start",
      headerName: "Vote Start",
      hide: false,
    }),
    dateColumn({
      field: "vote_end",
      headerName: "Vote End",
      hide: false,
    }),
    dateColumn({
      field: "created_at",
      headerName: "Created At",
      hide: true,
    }),
    dateColumn({
      field: "updated_at",
      headerName: "Updated At",
      hide: true,
    }),
    actionsColumn({
      cellRenderer: ActionComponent,
    }),
  ];
}

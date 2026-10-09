import { textColumn, actionsColumn, dateColumn } from "@/utils/table/columns";
import TextComponent from "../../../../components/DataTableComponents/TextComponent";
import { AvatarRenderer } from "../../../../components/Renderer/AvatarRenderer";
import ApplicationStatusRenderer from "../../../../components/Renderer/Election/ApplicationStatusRenderer";
export function electionApplicationColDef({ ActionComponent }) {
  return [
    textColumn({
      field: "Avatar",
      headerName: "Avatar",
      hide: false,
      cellRenderer: AvatarRenderer,
    }),
    textColumn({
      field: "application_manifesto",
      headerName: "Manifesto",
      hide: true,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "application_personal_vision",
      headerName: "Personal Vision",
      hide: true,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "application_commitment_statement",
      headerName: "Commitment Statement",
      hide: true,
      cellRenderer: TextComponent,
    }),
    textColumn({
        field: "name",
        headerName: "Student Name",
        hide: false,
        cellRenderer: TextComponent,
    }),
    textColumn({
      field: "first_name",
      headerName: "First Name",
      hide: true,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "last_name",
      headerName: "Last Name",
      hide: true,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "username",
      headerName: "Username",
      hide: true,
      cellRenderer: TextComponent,
    }),
    textColumn({
        field: "level",
      headerName: "Level",
      hide: true,
      cellRenderer: TextComponent,
    }),
    textColumn({
        field: "level_name",
        headerName: "Level Name",
        hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
        field: "specialty",
        headerName: "Specialty",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "application_status",
      headerName: "Status",
      hide: false,
      cellRenderer: ApplicationStatusRenderer,
    }),
    textColumn({
      field: "election",
      headerName: "Election",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "election_role",
      headerName: "Election Role",
      hide: false,
      cellRenderer: TextComponent,
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

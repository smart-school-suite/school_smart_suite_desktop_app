import { actionsColumn, dateColumn, textColumn } from "@/utils/table/columns";
import TextComponent from "../../../../components/DataTableComponents/TextComponent";
import { AvatarRenderer } from "../../../../components/Renderer/AvatarRenderer";
import ElectionCandidateStatusRenderer from "../../../../components/Renderer/Election/ElectionCandidateStatusRenderer";

export function electionCandidateColDefs({ ActionComponent }) {
  return [
    textColumn({
      field: "Avatar",
      headerName: "Avatar",
      hide: false,
      cellRenderer: AvatarRenderer,
    }),
    textColumn({
      field: "name",
      headerName: "Student",
      hide: true,
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
      field: "specialty",
      headerName: "Specialty",
       hide: true,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "status",
      headerName: "Status",
      hide: false,
      cellRenderer: ElectionCandidateStatusRenderer,
    }),
    textColumn({
      field: "level_name",
      headerName: "Level Name",
       hide: true,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "election_role",
      headerName: "Role",
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
      field: "manifesto",
      headerName: "Manifesto",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "personal_vision",
      headerName: "Vision",
      hide: false,
      cellRenderer: TextComponent,
    }),
    textColumn({
      field: "commitment_statement",
      headerName: "Commitment Statement",
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

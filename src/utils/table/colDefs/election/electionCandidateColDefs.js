import { textColumn, actionsColumn, dateColumn } from "@/utils/table/columns";
import TextComponent from "../../../../components/DataTableComponents/TextComponent";
import DepartmentTableBadge from "../../../../components/Badges/DepartmentTableBadge";

export function electionCandidateColDefs({ ActionComponent }) {
  return [
    textColumn({
      field: "student_name",
      headerName: "Student",
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

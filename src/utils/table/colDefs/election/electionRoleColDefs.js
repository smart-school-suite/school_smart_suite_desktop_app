import { textColumn, actionsColumn, dateColumn } from "@/utils/table/columns";
import TextComponent from "../../../../components/DataTableComponents/TextComponent";
import DepartmentTableBadge from "../../../../components/Badges/DepartmentTableBadge";

// Rows are flattened by the positions page (election_type_title, tenure).
export function electionRoleColDefs({ ActionComponent }) {
  return [
    textColumn({ field: "name", headerName: "Position", hide: false, cellRenderer: TextComponent }),
    textColumn({ field: "election_type_title", headerName: "Election Type", hide: false, cellRenderer: TextComponent }),
    textColumn({ field: "seats", headerName: "Seats", hide: false, cellRenderer: TextComponent }),
    textColumn({ field: "tenure", headerName: "Office Term", hide: false, cellRenderer: TextComponent }),
    textColumn({ field: "description", headerName: "Description", hide: false, cellRenderer: TextComponent }),
    textColumn({ field: "status", headerName: "Status", hide: false, cellRenderer: DepartmentTableBadge }),
    dateColumn({ field: "created_at", headerName: "Created At", hide: false }),
    dateColumn({ field: "updated_at", headerName: "Updated At", hide: true }),
    actionsColumn({ cellRenderer: ActionComponent }),
  ];
}

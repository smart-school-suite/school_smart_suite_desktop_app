import { numberColumn, textColumn } from "@/utils/table/columns";
import TextComponent from "../../../../components/DataTableComponents/TextComponent";
import DepartmentTableBadge from "../../../../components/Badges/DepartmentTableBadge";

// Positions on an election's ballot. Rows are flattened by the overview
// (tenure, seats, counts default to 0).
export function electionBallotPositionColDefs() {
  return [
    textColumn({ field: "name", headerName: "Position", hide: false, cellRenderer: TextComponent }),
    numberColumn({ field: "seats", headerName: "Seats", hide: false, flex: 0.6 }),
    textColumn({ field: "tenure", headerName: "Office Term", hide: false, flex: 2, minWidth: 260, cellRenderer: TextComponent }),
    numberColumn({ field: "applications_count", headerName: "Applications", hide: false, flex: 0.8 }),
    numberColumn({ field: "candidates_count", headerName: "Candidates", hide: false, flex: 0.8 }),
    textColumn({ field: "status", headerName: "Status", hide: false, cellRenderer: DepartmentTableBadge }),
  ];
}

import { textColumn, actionsColumn, dateColumn } from "@/utils/table/columns";
import TextComponent from "../../../../components/DataTableComponents/TextComponent";
import ApplicationStatusRenderer from "../../../../components/Renderer/Election/ApplicationStatusRenderer";

// Rows are flattened by the applications page (position_name, applicant_type_label).
export function electionApplicationColDef({ ActionComponent }) {
  return [
    textColumn({ field: "applicant_name", headerName: "Applicant", hide: false, cellRenderer: TextComponent }),
    textColumn({ field: "applicant_type_label", headerName: "Participant", hide: false, cellRenderer: TextComponent }),
    textColumn({ field: "election_title", headerName: "Election", hide: false, cellRenderer: TextComponent }),
    textColumn({ field: "position_name", headerName: "Position", hide: false, cellRenderer: TextComponent }),
    textColumn({ field: "application_status", headerName: "Status", hide: false, cellRenderer: ApplicationStatusRenderer }),
    textColumn({ field: "manifesto", headerName: "Manifesto", hide: true, cellRenderer: TextComponent }),
    textColumn({ field: "review_remarks", headerName: "Review Remarks", hide: true, cellRenderer: TextComponent }),
    dateColumn({ field: "created_at", headerName: "Applied At", hide: false }),
    dateColumn({ field: "reviewed_at", headerName: "Reviewed At", hide: true }),
    actionsColumn({ cellRenderer: ActionComponent }),
  ];
}

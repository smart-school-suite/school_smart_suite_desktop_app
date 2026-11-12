import { actionsColumn, textColumn } from "@/utils/table/columns";
import TextComponent from "../../../../components/DataTableComponents/TextComponent";
import ElectionCandidateStatusRenderer from "../../../../components/Renderer/Election/ElectionCandidateStatusRenderer";

// Rows are flattened by the candidates page (position_name, election_title, candidate_type_label).
export function electionCandidateColDefs({ ActionComponent }) {
  return [
    textColumn({ field: "name", headerName: "Candidate", hide: false, cellRenderer: TextComponent }),
    textColumn({ field: "candidate_type_label", headerName: "Participant", hide: false, cellRenderer: TextComponent }),
    textColumn({ field: "election_title", headerName: "Election", hide: false, cellRenderer: TextComponent }),
    textColumn({ field: "position_name", headerName: "Position", hide: false, cellRenderer: TextComponent }),
    textColumn({ field: "status", headerName: "Status", hide: false, cellRenderer: ElectionCandidateStatusRenderer }),
    textColumn({ field: "status_reason", headerName: "Status Reason", hide: false, cellRenderer: TextComponent }),
    textColumn({ field: "manifesto", headerName: "Manifesto", hide: true, cellRenderer: TextComponent }),
    actionsColumn({ cellRenderer: ActionComponent }),
  ];
}

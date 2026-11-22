import { BadgeRenderer, BADGE_CONTEXT } from "@/components/Renderer/badges";
import { actionsColumn, textColumn } from "@/utils/table/columns";
import TextComponent from "../../../../components/DataTableComponents/TextComponent";
// Rows are flattened by the candidates page (position_name, election_title, candidate_type_label).
export function electionCandidateColDefs({ ActionComponent }) {
  return [
    textColumn({ field: "name", headerName: "Candidate", hide: false, cellRenderer: TextComponent }),
    textColumn({ field: "candidate_type_label", headerName: "Participant", hide: false, cellRenderer: TextComponent }),
    textColumn({ field: "election_title", headerName: "Election", hide: false, cellRenderer: TextComponent }),
    textColumn({ field: "position_name", headerName: "Position", hide: false, cellRenderer: TextComponent }),
    textColumn({ field: "status", headerName: "Status", hide: false, cellRenderer: BadgeRenderer, cellRendererParams: { context: BADGE_CONTEXT.ELECTION_CANDIDATE } }),
    textColumn({ field: "status_reason", headerName: "Status Reason", hide: false, cellRenderer: TextComponent }),
    textColumn({ field: "manifesto", headerName: "Manifesto", hide: true, cellRenderer: TextComponent }),
    actionsColumn({ cellRenderer: ActionComponent }),
  ];
}

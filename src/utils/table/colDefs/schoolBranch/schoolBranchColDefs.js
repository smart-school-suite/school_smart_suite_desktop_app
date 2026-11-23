import { dateColumn, textColumn } from "@/utils/table/columns";
import TextComponent from "../../../../components/DataTableComponents/TextComponent";
import SchoolBranchNameRenderer from "../../../../components/Renderer/SchoolBranch/SchoolBranchNameRenderer";

export function schoolBranchColDefs() {
  return [
    textColumn({
      field: "name",
      headerName: "Branch Name",
      minWidth: 220,
      cellRenderer: SchoolBranchNameRenderer,
    }),
    textColumn({ field: "abbreviation", headerName: "Abbreviation", cellRenderer: TextComponent }),
    textColumn({ field: "city", headerName: "City", cellRenderer: TextComponent }),
    textColumn({ field: "state", headerName: "State", cellRenderer: TextComponent }),
    textColumn({ field: "address", headerName: "Address", hide: true, cellRenderer: TextComponent }),
    textColumn({ field: "phone", headerName: "Phone", cellRenderer: TextComponent }),
    textColumn({ field: "email", headerName: "Email" }),
    textColumn({ field: "website", headerName: "Website", hide: true }),
    dateColumn({ field: "created_at", headerName: "Created On" }),
  ];
}

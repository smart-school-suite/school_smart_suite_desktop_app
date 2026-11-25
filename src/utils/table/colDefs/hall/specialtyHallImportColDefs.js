import { textColumn } from "@/utils/table/columns";
import TextComponent from "../../../../components/DataTableComponents/TextComponent";

export function specialtyHallImportColDefs() {
  return [
    textColumn({ field: "hall", headerName: "Hall", hide: false, cellRenderer: TextComponent }),
    textColumn({ field: "specialty", headerName: "Specialty", hide: false, cellRenderer: TextComponent }),
    textColumn({ field: "level", headerName: "Level", hide: false, cellRenderer: TextComponent }),
  ];
}

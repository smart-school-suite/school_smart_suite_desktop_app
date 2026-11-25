import { ArrowUpFromLine } from "lucide-react";
import { ModalButton } from "../../components/DataTableComponents/ActionComponent";
import ImportWizzard from "../../ModalContent/Import/ImportWizzard";
import {
  addRepeatableGroup,
  removeRepeatableGroup,
  setColumnMapping,
  setImportReset,
  setImportSelectedFile,
  setImportStatus,
  setRepeatableGroupValue,
  setStandardGroupValue,
} from "../../Slices/administrator/hallSlice";
import { HALL_COLUMNS } from "../../utils/hall/hallColumns";
import { hallImportColDefs } from "../../utils/table/colDefs/hall/hallImportColDefs";

function HallImportTrigger() {
  return (
    <ModalButton
      classname="border-none border rounded-3 font-size-sm p-2 d-flex flex-row align-items-center gap-1 white-bg"
      action={{ modalContent: ImportWizzard }}
      size={"xl"}
      rowData={{
        moduleState: "hall",
        setImportStatus,
        setImportReset,
        setImportSelectedFile,
        moduleColumns: HALL_COLUMNS,
        setColumnMapping,
        setStandardGroupValue,
        addRepeatableGroup,
        removeRepeatableGroup,
        setRepeatableGroupValue,
        moduleInstanceMap: [],
        module: { name: "Hall" },
        importModuleColDefs: hallImportColDefs,
      }}
      style={{ height: 36 }}
    >
      <span style={{ lineHeight: "16px" }}>Import</span>
      <span>
        <ArrowUpFromLine size={12} />
      </span>
    </ModalButton>
  );
}
export default HallImportTrigger;

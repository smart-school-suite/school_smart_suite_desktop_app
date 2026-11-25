import { ArrowUpFromLine } from "lucide-react";
import { ModalButton } from "../../components/DataTableComponents/ActionComponent";
import ImportWizzard from "../../ModalContent/Import/ImportWizzard";
import {
  setColumnMapping,
  setImportReset,
  setImportSelectedFile,
  setImportStatus,
  setStandardGroupValue,
} from "../../Slices/administrator/hallSpecialtySlice";
import { SPECIALTY_HALL_COLUMNS } from "../../utils/hall/specialtyHallColumns";
import { specialtyHallImportColDefs } from "../../utils/table/colDefs/hall/specialtyHallImportColDefs";

function SpecialtyHallImportTrigger() {
  return (
    <ModalButton
      classname="border-none border rounded-3 font-size-sm p-2 d-flex flex-row align-items-center gap-1 white-bg"
      action={{ modalContent: ImportWizzard }}
      closeOnOutsideClick={false}
      size={"xl"}
      rowData={{
        moduleState: "hallSpecialty",
        setImportStatus,
        setImportReset,
        setImportSelectedFile,
        moduleColumns: SPECIALTY_HALL_COLUMNS,
        setColumnMapping,
        setStandardGroupValue,
        moduleInstanceMap: [],
        module: { name: "Specialty Hall" },
        importModuleColDefs: specialtyHallImportColDefs,
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
export default SpecialtyHallImportTrigger;

import { ModalButton } from "../../components/DataTableComponents/ActionComponent";
import { teacherImportColDefs } from "../../utils/table/colDefs/teachers/teacherImportColdefs";
import ImportWizzard from "../../ModalContent/Import/ImportWizzard";
import { TEACHER_COLUMNS } from "../../utils/teacher/teacherColumns";
import {
  resetAllCustomFilters,
  addCustomFilter,
  toggleGeneralFilter,
  removeCustomFilter,
  setCustomFilter,
  setImportStatus,
  setImportSelectedFile,
  setImportReset,
  setColumnMapping,
  removeRepeatableGroup,
  addRepeatableGroup,
  setRepeatableGroupValue,
  setStandardGroupValue,
} from "../../Slices/teacher/teacherSlice";
import { teacherInstanceMap } from "../../utils/maps/teacher/teacherInstanceMap";
import { Icon } from "@iconify/react";
import { ArrowDown } from "lucide-react";
function TeacherImportTrigger() {
  return (
    <>
      <ModalButton
        action={{ modalContent: ImportWizzard }}
        size={"xl"}
        rowData={{
          moduleState: "teachers",
          setImportStatus: setImportStatus,
          setImportReset: setImportReset,
          setImportSelectedFile: setImportSelectedFile,
          moduleColumns: TEACHER_COLUMNS,
          setColumnMapping: setColumnMapping,
          setStandardGroupValue: setStandardGroupValue,
          addRepeatableGroup: addRepeatableGroup,
          removeRepeatableGroup: removeRepeatableGroup,
          setRepeatableGroupValue: setRepeatableGroupValue,
          moduleInstanceMap: teacherInstanceMap,
          module: { name: "Teacher" },
          importModuleColDefs: teacherImportColDefs,
        }}
        style={{padding: "0.5rem"}}
        classname={
          "border-none border rounded-3 font-size-sm d-flex flex-row align-items-center gap-1 white-bg"
        }
      >
        <span style={{ lineHeight: "16px" }}>Import</span>
        <span>
          <Icon icon="tabler:arrow-down" width={14} height={14} />
        </span>
      </ModalButton>
    </>
  );
}
export default TeacherImportTrigger;

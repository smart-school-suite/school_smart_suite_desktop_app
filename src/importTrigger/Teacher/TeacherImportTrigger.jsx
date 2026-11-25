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
} from "../../Slices/teacher/teacherSlice";
import { teacherInstanceMap } from "../../utils/maps/teacher/teacherInstanceMap";
import { teacherImportColDefs } from "../../utils/table/colDefs/teachers/teacherImportColdefs";
import { TEACHER_COLUMNS } from "../../utils/teacher/teacherColumns";
function TeacherImportTrigger() {
  return (
    <>
      <ModalButton
        action={{ modalContent: ImportWizzard }}
        closeOnOutsideClick={false}
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
        style={{padding: "0.5rem", height:36}}
        classname={
          "border-none border rounded-3 font-size-sm d-flex flex-row align-items-center gap-1 white-bg"
        }
      >
        <span style={{ lineHeight: "16px" }}>Import</span>
        <span>
          <ArrowUpFromLine size={12} />
        </span>
      </ModalButton>
    </>
  );
}
export default TeacherImportTrigger;

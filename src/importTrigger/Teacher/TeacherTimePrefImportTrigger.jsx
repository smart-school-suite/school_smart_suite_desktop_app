import { ModalButton } from "../../components/DataTableComponents/ActionComponent";
import ImportWizzard from "../../ModalContent/Import/ImportWizzard";
import {
  setCustomFilter,
  setImportStatus,
  setImportSelectedFile,
  setImportReset,
  setColumnMapping,
  setStandardGroupValue,
} from "../../Slices/teacher/teacherTimePrefSlice";
import { Icon } from "@iconify/react";
import { TEACHER_PREF_TIME_SLOT_COLUMNS } from "../../utils/teacher/teacherPrefTimeSlotColumns";
import { ArrowDown } from "lucide-react";
function TeacherTimePrefImportTrigger() {
  return (
    <>
      <ModalButton
        action={{ modalContent: ImportWizzard }}
        size={"xl"}
        rowData={{
          moduleState: "teacherTimePref",
          setImportStatus: setImportStatus,
          setImportReset: setImportReset,
          setImportSelectedFile: setImportSelectedFile,
          moduleColumns: TEACHER_PREF_TIME_SLOT_COLUMNS,
          setColumnMapping: setColumnMapping,
          setStandardGroupValue: setStandardGroupValue,
          moduleInstanceMap: [],
          module: { name: "Teacher Time Preference" },
          importModuleColDefs: [],
        }}
        style={{padding: "0.6rem"}}
        classname={
          "border-none border rounded-3 font-size-sm d-flex flex-row align-items-center gap-2 white-bg"
        }
      >
        <span style={{ lineHeight: "16px" }}>Import</span>
        <ArrowDown size={16} />
      </ModalButton>
    </>
  );
}
export default TeacherTimePrefImportTrigger;

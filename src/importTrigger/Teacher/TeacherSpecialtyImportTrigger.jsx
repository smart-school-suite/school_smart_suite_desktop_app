import { ModalButton } from "../../components/DataTableComponents/ActionComponent";
import { teacherSpecialtyImportColDefs } from "../../utils/table/colDefs/teachers/teacherSpecialtyImportColDefs";
import ImportWizzard from "../../ModalContent/Import/ImportWizzard";
import {
  setCustomFilter,
  setImportStatus,
  setImportSelectedFile,
  setImportReset,
  setColumnMapping,
  setStandardGroupValue,
} from "../../Slices/teacher/teacherSpecialtySlice";
import { Icon } from "@iconify/react";
import { TEACHER_SPECIALTY_COLUMNS } from "../../utils/teacher/teacherSpecialtyColumns";
import { ArrowDown } from "lucide-react";
function TeacherSpecialtyImportTrigger() {
  return (
    <>
      <ModalButton
        action={{ modalContent: ImportWizzard }}
        size={"xl"}
        rowData={{
          moduleState: "teacherSpecialty",
          setImportStatus: setImportStatus,
          setImportReset: setImportReset,
          setImportSelectedFile: setImportSelectedFile,
          moduleColumns: TEACHER_SPECIALTY_COLUMNS,
          setColumnMapping: setColumnMapping,
          setStandardGroupValue: setStandardGroupValue,
          moduleInstanceMap: [],
          module: { name: "Teacher Specialty" },
          importModuleColDefs: teacherSpecialtyImportColDefs,
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
export default TeacherSpecialtyImportTrigger;

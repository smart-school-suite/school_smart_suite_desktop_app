import { ArrowUpFromLine } from "lucide-react";
import { ModalButton } from "../../components/DataTableComponents/ActionComponent";
import ImportWizzard from "../../ModalContent/Import/ImportWizzard";
import {
  setColumnMapping,
  setImportReset,
  setImportSelectedFile,
  setImportStatus,
  setStandardGroupValue,
} from "../../Slices/teacher/teacherSpecialtySlice";
import { teacherSpecialtyImportColDefs } from "../../utils/table/colDefs/teachers/teacherSpecialtyImportColDefs";
import { TEACHER_SPECIALTY_COLUMNS } from "../../utils/teacher/teacherSpecialtyColumns";
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
        style={{padding: "0.6rem", height:36}}
        classname={
          "border-none border rounded-3 font-size-sm d-flex flex-row align-items-center gap-2 white-bg"
        }
      >
        <span style={{ lineHeight: "16px" }}>Import</span>
        <ArrowUpFromLine size={12} />
      </ModalButton>
    </>
  );
}
export default TeacherSpecialtyImportTrigger;

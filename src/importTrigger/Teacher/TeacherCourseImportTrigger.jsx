import { ArrowUpFromLine } from "lucide-react";
import { ModalButton } from "../../components/DataTableComponents/ActionComponent";
import ImportWizzard from "../../ModalContent/Import/ImportWizzard";
import {
  setColumnMapping,
  setImportReset,
  setImportSelectedFile,
  setImportStatus,
  setStandardGroupValue,
} from "../../Slices/teacher/teacherCourseSlice";
import { teacherCourseImportColDefs } from "../../utils/table/colDefs/teachers/teacherCourseImportColDefs";
import { TEACHER_COURSE_COLUMNS } from "../../utils/teacher/teacherCourseColumns";
function TeacherCourseImportTrigger() {
  return (
    <>
      <ModalButton
        action={{ modalContent: ImportWizzard }}
        closeOnOutsideClick={false}
        size={"xl"}
        rowData={{
          moduleState: "teacherCourse",
          setImportStatus: setImportStatus,
          setImportReset: setImportReset,
          setImportSelectedFile: setImportSelectedFile,
          moduleColumns: TEACHER_COURSE_COLUMNS,
          setColumnMapping: setColumnMapping,
          setStandardGroupValue: setStandardGroupValue,
          moduleInstanceMap: [],
          module: { name: "Teacher Course" },
          importModuleColDefs: teacherCourseImportColDefs,
        }}
        style={{padding: "0.6rem", height:36}}
        classname={
          "border-none border rounded-3 font-size-sm d-flex flex-row align-items-center gap-2 white-bg"
        }
      >
        <span style={{ lineHeight: "16px" }}>Import</span>
        <ArrowUpFromLine size={16} />
      </ModalButton>
    </>
  );
}
export default TeacherCourseImportTrigger;

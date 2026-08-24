import { ModalButton } from "../../components/DataTableComponents/ActionComponent";
import { teacherCourseImportColDefs } from "../../utils/table/colDefs/teachers/teacherCourseImportColDefs";
import ImportWizzard from "../../ModalContent/Import/ImportWizzard";
import { TEACHER_COURSE_COLUMNS } from "../../utils/teacher/teacherCourseColumns";
import {
  setCustomFilter,
  setImportStatus,
  setImportSelectedFile,
  setImportReset,
  setColumnMapping,
  setStandardGroupValue,
} from "../../Slices/teacher/teacherCourseSlice";
import { Icon } from "@iconify/react";
import { ArrowDown } from "lucide-react";
function TeacherCourseImportTrigger() {
  return (
    <>
      <ModalButton
        action={{ modalContent: ImportWizzard }}
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
export default TeacherCourseImportTrigger;

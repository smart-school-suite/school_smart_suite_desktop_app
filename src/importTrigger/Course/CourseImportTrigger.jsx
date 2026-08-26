import { ModalButton } from "../../components/DataTableComponents/ActionComponent";
import ImportWizzard from "../../ModalContent/Import/ImportWizzard";
import { COURSE_COLUMNS } from "../../utils/course/courseColumns";
import { courseImportColDefs } from "../../utils/table/colDefs/course/courseImportColDefs";
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
} from "../../Slices/administrator/courseSlice";
import { Icon } from "@iconify/react";
import { ArrowDown } from "lucide-react";
import { courseInstanceMap } from "../../utils/maps/course/courseInstanceMap";
function CourseImportTrigger() {
  return (
    <>
      <ModalButton
        classname={
          "border-none border rounded-3 font-size-sm p-2 d-flex flex-row align-items-center gap-1 white-bg"
        }
        action={{ modalContent: ImportWizzard }}
        size={"xl"}
        rowData={{
          moduleState: "course",
          setImportStatus: setImportStatus,
          setImportReset: setImportReset,
          setImportSelectedFile: setImportSelectedFile,
          moduleColumns: COURSE_COLUMNS,
          setColumnMapping: setColumnMapping,
          setStandardGroupValue: setStandardGroupValue,
          addRepeatableGroup: addRepeatableGroup,
          removeRepeatableGroup: removeRepeatableGroup,
          setRepeatableGroupValue: setRepeatableGroupValue,
          moduleInstanceMap: courseInstanceMap,
          module: { name: "Course" },
          importModuleColDefs: courseImportColDefs,
        }}
      >
        <span style={{ lineHeight: "16px" }}>Import</span>
        <span>
          <Icon icon="tabler:arrow-down" width={14} height={14} />
        </span>
      </ModalButton>
    </>
  );
}
export default CourseImportTrigger;

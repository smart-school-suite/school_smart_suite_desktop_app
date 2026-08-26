import { ModalButton } from "../../components/DataTableComponents/ActionComponent";
import ImportWizzard from "../../ModalContent/Import/ImportWizzard";
import { JOINT_COURSE_COLUMNS } from "../../utils/course/jointCourseColumns";
import jointCourseImportColDefs from "../../utils/table/colDefs/course/jointCourseImportColDefs";
import { jointCourseInstanceMap } from "../../utils/maps/course/jointCourseInstanceMap";
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
} from "../../Slices/academics/jointCourseSlice";
import { Icon } from "@iconify/react";
import { ArrowDown } from "lucide-react";
function JointCourseImportTrigger() {
  return (
    <>
      <ModalButton
        classname={
          "border-none border rounded-3 font-size-sm p-2 d-flex flex-row align-items-center gap-1 white-bg"
        }
        action={{ modalContent: ImportWizzard }}
        size={"xl"}
        rowData={{
          moduleState: "jointCourse",
          setImportStatus: setImportStatus,
          setImportReset: setImportReset,
          setImportSelectedFile: setImportSelectedFile,
          moduleColumns: JOINT_COURSE_COLUMNS,
          setColumnMapping: setColumnMapping,
          setStandardGroupValue: setStandardGroupValue,
          addRepeatableGroup: addRepeatableGroup,
          removeRepeatableGroup: removeRepeatableGroup,
          setRepeatableGroupValue: setRepeatableGroupValue,
          moduleInstanceMap: jointCourseInstanceMap,
          module: { name: "Joint Course" },
          importModuleColDefs: jointCourseImportColDefs,
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
export default JointCourseImportTrigger;

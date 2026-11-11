import SemesterSyncOptionSetting from "./SemesterSyncOptionSetting";
import { semesterSyncScopeOptions } from "./semesterSyncOptions";

function SemesterSyncScopeSetting(props) {
  return (
    <SemesterSyncOptionSetting
      {...props}
      title="Synchronization Scope"
      note="Only applies when the synchronization mode is Across Programmes."
      options={semesterSyncScopeOptions}
    />
  );
}
export default SemesterSyncScopeSetting;

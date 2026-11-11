import SemesterSyncOptionSetting from "./SemesterSyncOptionSetting";
import { semesterSyncModeOptions } from "./semesterSyncOptions";

function SemesterSyncModeSetting(props) {
  return (
    <SemesterSyncOptionSetting
      {...props}
      title="Semester Synchronization Mode"
      options={semesterSyncModeOptions}
    />
  );
}
export default SemesterSyncModeSetting;

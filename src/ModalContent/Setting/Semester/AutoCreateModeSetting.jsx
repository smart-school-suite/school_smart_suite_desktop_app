import SemesterOptionSetting from "./SemesterOptionSetting";
import { autoCreateModeOptions } from "./semesterAutoCreateOptions";

function AutoCreateModeSetting(props) {
  return (
    <SemesterOptionSetting
      {...props}
      title="Automatic Semester Creation"
      options={autoCreateModeOptions}
    />
  );
}
export default AutoCreateModeSetting;

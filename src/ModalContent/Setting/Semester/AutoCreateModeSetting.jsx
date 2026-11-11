import SemesterOptionSetting from "./SemesterOptionSetting";
import { autoCreateModeOptions } from "./semesterAutoCreateOptions";

function AutoCreateModeSetting(props) {
  return (
    <SemesterOptionSetting
      {...props}
      title="Automatic Semester Creation"
      note="Within the Same Specialty turns both Across switches off. Across Specialties turns on Across Specialties if neither switch is on."
      options={autoCreateModeOptions}
    />
  );
}
export default AutoCreateModeSetting;

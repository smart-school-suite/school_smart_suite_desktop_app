import AutoCreateOptionSetting from "./AutoCreateOptionSetting";
import { autoCreateModeOptions } from "./autoCreateOptions";

function AutoCreateModeSetting({ title, noun, ...props }) {
  return (
    <AutoCreateOptionSetting
      {...props}
      title={title}
      note="Within the Same Specialty turns both Across switches off. Across Specialties turns on Across Specialties if neither switch is on."
      options={autoCreateModeOptions(noun)}
    />
  );
}
export default AutoCreateModeSetting;

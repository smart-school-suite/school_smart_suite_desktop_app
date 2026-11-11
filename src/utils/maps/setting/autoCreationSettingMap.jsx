import Switch from "../../../components/input/Switch";
import AutoCreateLevelsSetting from "../../../ModalContent/Setting/AutoCreation/AutoCreateLevelsSetting";
import AutoCreateModeSetting from "../../../ModalContent/Setting/AutoCreation/AutoCreateModeSetting";
import {
  autoCreateModeOptions,
  optionLabel,
} from "../../../ModalContent/Setting/AutoCreation/autoCreateOptions";

/**
 * Setting map entries for one automatic creation group. Semester Settings
 * and Academic Year Settings have the same five settings under their own
 * key prefix (e.g. "semester.auto_create_").
 *
 * Dependent settings stay visible but are disabled, with the reason shown
 * under them, until the group's mode allows them. The two Across switches
 * are independent: both may be on at the same time.
 */
export const createAutoCreationSettingMap = ({ prefix, label, noun }) => {
  const key = (name) => `${prefix}${name}`;
  const modeKey = key("mode");
  const disabledReason = `Enable ${label} to change this setting.`;

  const whileEnabled = (values) =>
    !values[modeKey] || values[modeKey] === "disabled" ? disabledReason : null;

  const whileAcrossSpecialties = (values) => {
    const mode = values[modeKey];
    if (!mode || mode === "disabled") return disabledReason;
    if (mode !== "across_specialties") {
      return `Choose Across Specialties under ${label} to change this setting.`;
    }
    return null;
  };

  const options = autoCreateModeOptions(noun);
  const ModeSetting = (props) => <AutoCreateModeSetting {...props} title={label} noun={noun} />;
  const LevelsSetting = (props) => <AutoCreateLevelsSetting {...props} noun={noun} />;
  const switchEntry = (name, order, disabledReasonFor) => ({
    key: key(name),
    order,
    editor: "switch",
    valueType: "boolean",
    component: Switch,
    disabledReason: disabledReasonFor,
  });

  return {
    [modeKey]: {
      key: modeKey,
      order: 1,
      editor: "modal",
      valueType: "string",
      component: ModeSetting,
      formatValue: (value) => optionLabel(options, value),
    },
    [key("levels")]: {
      key: key("levels"),
      order: 2,
      editor: "modal",
      valueType: "json",
      component: LevelsSetting,
      disabledReason: whileEnabled,
    },
    [key("across_specialties")]: switchEntry("across_specialties", 3, whileAcrossSpecialties),
    [key("across_all_levels")]: switchEntry("across_all_levels", 4, whileAcrossSpecialties),
    [key("require_students")]: switchEntry("require_students", 5, whileEnabled),
  };
};

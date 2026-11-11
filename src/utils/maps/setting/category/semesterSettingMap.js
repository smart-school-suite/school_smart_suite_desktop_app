import Switch from "../../../../components/input/Switch";
import AutoCreateLevelsSetting from "../../../../ModalContent/Setting/Semester/AutoCreateLevelsSetting";
import AutoCreateModeSetting from "../../../../ModalContent/Setting/Semester/AutoCreateModeSetting";
import {
  AUTO_CREATE_MODE_KEY,
  autoCreateModeOptions,
  optionLabel,
} from "../../../../ModalContent/Setting/Semester/semesterAutoCreateOptions";

// Hidden while Automatic Semester Creation is disabled: they only apply when it is on.
const whileAutoCreateEnabled = {
  key: AUTO_CREATE_MODE_KEY,
  hiddenWhen: (modeValue) => !modeValue || modeValue === "disabled",
};

export const semesterSettingMap = {
  [AUTO_CREATE_MODE_KEY]: {
    key: AUTO_CREATE_MODE_KEY,
    editor: "modal",
    valueType: "string",
    component: AutoCreateModeSetting,
    formatValue: (value) => optionLabel(autoCreateModeOptions, value),
  },
  "semester.auto_create_levels": {
    key: "semester.auto_create_levels",
    editor: "modal",
    valueType: "json",
    component: AutoCreateLevelsSetting,
    dependsOn: whileAutoCreateEnabled,
  },
  // Independent switches: both may be on at the same time.
  "semester.auto_create_across_specialties": {
    key: "semester.auto_create_across_specialties",
    editor: "switch",
    valueType: "boolean",
    component: Switch,
    dependsOn: whileAutoCreateEnabled,
  },
  "semester.auto_create_across_all_levels": {
    key: "semester.auto_create_across_all_levels",
    editor: "switch",
    valueType: "boolean",
    component: Switch,
    dependsOn: whileAutoCreateEnabled,
  },
};

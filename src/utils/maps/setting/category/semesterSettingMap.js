import Switch from "../../../../components/input/Switch";
import AutoCreateLevelsSetting from "../../../../ModalContent/Setting/Semester/AutoCreateLevelsSetting";
import AutoCreateModeSetting from "../../../../ModalContent/Setting/Semester/AutoCreateModeSetting";
import {
  AUTO_CREATE_MODE_KEY,
  autoCreateModeOptions,
  optionLabel,
} from "../../../../ModalContent/Setting/Semester/semesterAutoCreateOptions";

// Dependent settings stay visible but are disabled, with the reason shown
// under them, until the Automatic Semester Creation option allows them.
const DISABLED_REASON = "Enable Automatic Semester Creation to change this setting.";

const whileAutoCreateEnabled = (values) =>
  !values[AUTO_CREATE_MODE_KEY] || values[AUTO_CREATE_MODE_KEY] === "disabled"
    ? DISABLED_REASON
    : null;

const whileAcrossSpecialties = (values) => {
  const mode = values[AUTO_CREATE_MODE_KEY];
  if (!mode || mode === "disabled") return DISABLED_REASON;
  if (mode !== "across_specialties") {
    return "Choose Across Specialties under Automatic Semester Creation to change this setting.";
  }
  return null;
};

export const semesterSettingMap = {
  [AUTO_CREATE_MODE_KEY]: {
    key: AUTO_CREATE_MODE_KEY,
    order: 1,
    editor: "modal",
    valueType: "string",
    component: AutoCreateModeSetting,
    formatValue: (value) => optionLabel(autoCreateModeOptions, value),
  },
  "semester.auto_create_levels": {
    key: "semester.auto_create_levels",
    order: 2,
    editor: "modal",
    valueType: "json",
    component: AutoCreateLevelsSetting,
    disabledReason: whileAutoCreateEnabled,
  },
  // Independent switches: both may be on at the same time.
  "semester.auto_create_across_specialties": {
    key: "semester.auto_create_across_specialties",
    order: 3,
    editor: "switch",
    valueType: "boolean",
    component: Switch,
    disabledReason: whileAcrossSpecialties,
  },
  "semester.auto_create_across_all_levels": {
    key: "semester.auto_create_across_all_levels",
    order: 4,
    editor: "switch",
    valueType: "boolean",
    component: Switch,
    disabledReason: whileAcrossSpecialties,
  },
  "semester.auto_create_require_students": {
    key: "semester.auto_create_require_students",
    order: 5,
    editor: "switch",
    valueType: "boolean",
    component: Switch,
    disabledReason: whileAutoCreateEnabled,
  },
};

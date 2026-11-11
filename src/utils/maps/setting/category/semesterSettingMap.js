import Switch from "../../../../components/input/Switch";

// The two modes are mutually exclusive: the API switches the other one off
// when one is enabled, and the settings query is refetched after each update.
export const semesterSettingMap = {
  "semester.auto_create_all_levels": {
    key: "semester.auto_create_all_levels",
    editor: "switch",
    valueType: "boolean",
    component: Switch
  },
  "semester.auto_create_levels_with_students": {
    key: "semester.auto_create_levels_with_students",
    editor: "switch",
    valueType: "boolean",
    component: Switch
  },
};

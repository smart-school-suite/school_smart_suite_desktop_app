import Switch from "../../../../components/input/Switch";
import SemesterSyncLevelsSetting from "../../../../ModalContent/Setting/Semester/SemesterSyncLevelsSetting";
import SemesterSyncModeSetting from "../../../../ModalContent/Setting/Semester/SemesterSyncModeSetting";
import SemesterSyncScopeSetting from "../../../../ModalContent/Setting/Semester/SemesterSyncScopeSetting";
import {
  optionLabel,
  semesterSyncModeOptions,
  semesterSyncScopeOptions,
} from "../../../../ModalContent/Setting/Semester/semesterSyncOptions";

export const semesterSettingMap = {
  "semester.sync_mode": {
    key: "semester.sync_mode",
    editor: "modal",
    valueType: "string",
    component: SemesterSyncModeSetting,
    formatValue: (value) => optionLabel(semesterSyncModeOptions, value),
  },
  "semester.sync_allowed_levels": {
    key: "semester.sync_allowed_levels",
    editor: "modal",
    valueType: "json",
    component: SemesterSyncLevelsSetting,
  },
  "semester.sync_scope": {
    key: "semester.sync_scope",
    editor: "modal",
    valueType: "string",
    component: SemesterSyncScopeSetting,
    formatValue: (value) => optionLabel(semesterSyncScopeOptions, value),
  },
  "semester.sync_require_students": {
    key: "semester.sync_require_students",
    editor: "switch",
    valueType: "boolean",
    component: Switch,
  },
};

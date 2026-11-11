import Switch from "../../../../components/input/Switch";
import PeriodDurationSetting from "../../../../ModalContent/Setting/Timetable/PeriodDurationSetting";

// The two preference switches are mutually exclusive: the API always keeps
// exactly one of them on, and the settings are refetched after each change.
export const timetableSettingMap = {
  "timetable.ignore_teacher_preference": {
    key: "timetable.ignore_teacher_preference",
    order: 2,
    editor: "switch",
    valueType: "boolean",
    component: Switch
  },
  "timetable.respect_teacher_preference": {
    key: "timetable.respect_teacher_preference",
    order: 1,
    editor: "switch",
    valueType: "boolean",
    component: Switch
  },
  "timetable.period_duration": {
    key: "timetable.period_duration",
    order: 3,
    editor: "modal",
    valueType: "integer",
    component: PeriodDurationSetting
  },
};

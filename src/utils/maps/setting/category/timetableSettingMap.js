import Switch from "../../../../components/input/Switch";
import PeriodDurationSetting from "../../../../ModalContent/Setting/Timetable/PeriodDurationSetting";

export const timetableSettingMap = {
  "timetable.ignore_teacher_preference": {
    key: "timetable.ignore_teacher_preference",
    editor: "switch",
    valueType: "boolean",
    component: Switch
  },
  "timetable.respect_teacher_preference": {
    key: "timetable.respect_teacher_preference",
    editor: "switch",
    valueType: "boolean",
    component: Switch
  },
  "timetable.period_duration": {
    key: "timetable.period_duration",
    editor: "modal",
    valueType: "integer",
    component: PeriodDurationSetting
  },
};

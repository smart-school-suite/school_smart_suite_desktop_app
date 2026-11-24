import MaxSemestersSetting from "../../../../ModalContent/Setting/Semester/MaxSemestersSetting";
import { createAutoCreationSettingMap } from "../autoCreationSettingMap";

export const MAX_SEMESTERS_KEY = "semester.max_per_academic_year";

export const semesterSettingMap = {
  [MAX_SEMESTERS_KEY]: {
    key: MAX_SEMESTERS_KEY,
    order: 0,
    editor: "modal",
    valueType: "integer",
    component: MaxSemestersSetting,
    formatValue: (value) => (Number(value) === 1 ? "1 semester" : `${value ?? 2} semesters`),
  },
  ...createAutoCreationSettingMap({
    prefix: "semester.auto_create_",
    label: "Automatic Semester Creation",
    noun: "semester",
  }),
};

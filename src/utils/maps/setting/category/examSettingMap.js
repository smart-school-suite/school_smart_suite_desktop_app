import { createElement } from "react";
import Switch from "../../../../components/input/Switch";
import CaDefaultMaxScoreSetting from "../../../../ModalContent/Setting/Exam/CaDefaultMaxScoreSetting";
import ExamDefaultMaxScoreSetting from "../../../../ModalContent/Setting/Exam/ExamDefaultMaxScoreSetting";
import ResitExamDefaultMaxScoreSetting from "../../../../ModalContent/Setting/Exam/ResitExamDefaultMaxScoreSetting";
import AutoCreateExamTypesSetting, { examTypeOptionLabel } from "../../../../ModalContent/Setting/Exam/AutoCreateExamTypesSetting";
import AutoCreateLevelsSetting from "../../../../ModalContent/Setting/AutoCreation/AutoCreateLevelsSetting";

const isOn = (value) => value === true || value === 1 || value === "1" || value === "true";

const autoCreateOff = (values) =>
  isOn(values["exam.auto_create"] ?? true)
    ? null
    : "Turn on Automatically Create Exams for Matching Semesters to change this setting.";

const AutoExamLevelsSetting = (props) =>
  createElement(AutoCreateLevelsSetting, {
    ...props,
    title: "Levels for Automatic Exam Creation",
    description:
      "When an exam is created, specialties at the selected levels whose semester has the same start and end dates get it too. The specialty it is created for always gets it.",
    requireOne: true,
  });

export const examSettingMap = {
  "exam.auto_create": {
    key: "exam.auto_create",
    order: 1,
    editor: "switch",
    valueType: "boolean",
    component: Switch
  },
  "exam.auto_create_levels": {
    key: "exam.auto_create_levels",
    order: 2,
    editor: "modal",
    valueType: "json",
    component: AutoExamLevelsSetting,
    disabledReason: autoCreateOff,
  },
  "exam.auto_create_types": {
    key: "exam.auto_create_types",
    order: 3,
    editor: "modal",
    valueType: "string",
    component: AutoCreateExamTypesSetting,
    formatValue: examTypeOptionLabel,
    disabledReason: autoCreateOff,
  },
  "exam.auto_attach_grade_scale": {
    key: "exam.auto_attach_grade_scale",
    order: 4,
    editor: "switch",
    valueType: "boolean",
    component: Switch
  },
  "exam.ca_default_max_score": {
    key: "exam.ca_default_max_score",
    order: 5,
    editor: "modal",
    valueType: "float",
    component: CaDefaultMaxScoreSetting
  },
  "exam.exam_default_max_score": {
    key: "exam.exam_default_max_score",
    order: 6,
    editor: "modal",
    valueType: "float",
    component: ExamDefaultMaxScoreSetting
  },
  "exam.resit_exam_default_max_score": {
    key: "exam.resit_exam_default_max_score",
    order: 7,
    editor: "modal",
    valueType: "float",
    component: ResitExamDefaultMaxScoreSetting
  },
};

import Switch from "../../../../components/input/Switch";
import CaDefaultMaxScoreSetting from "../../../../ModalContent/Setting/Exam/CaDefaultMaxScoreSetting";
import ExamDefaultMaxScoreSetting from "../../../../ModalContent/Setting/Exam/ExamDefaultMaxScoreSetting";
import ResitExamDefaultMaxScoreSetting from "../../../../ModalContent/Setting/Exam/ResitExamDefaultMaxScoreSetting";

export const examSettingMap = {
  "exam.auto_create": {
    key: "exam.auto_create",
    editor: "switch",
    valueType: "boolean",
    component: Switch
  },
  "exam.ca_default_max_score": {
    key: "exam.ca_default_max_score",
    editor: "modal",
    valueType: "float",
    component: CaDefaultMaxScoreSetting
  },
  "exam.exam_default_max_score": {
    key: "exam.exam_default_max_score",
    editor: "modal",
    valueType: "float",
    component: ExamDefaultMaxScoreSetting
  },
  "exam.resit_exam_default_max_score": {
    key: "exam.resit_exam_default_max_score",
    editor: "modal",
    valueType: "float",
    component: ResitExamDefaultMaxScoreSetting
  },
};

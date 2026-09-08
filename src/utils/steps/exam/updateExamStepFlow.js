import UpdateExam from "../../../DrawerContent/Exam/UpdateExam/UpdateExam";
import SelectExamType from "../../../DrawerContent/Exam/UpdateExam/SelectExamType";
export const UPDATE_EXAM_STEP_FLOW = [
  {
    step: "SELECT_EXAM_TYPE",
    lable: "Select Exam",
    component: SelectExamType,
  },
  {
    step: "UPDATE_EXAM",
    label: "Update Exam",
    component: UpdateExam,
  },
];

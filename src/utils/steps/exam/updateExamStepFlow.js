import UpdateExam from "../../../DrawerContent/Exam/UpdateExam/UpdateExam";
import SelectExamType from "../../../DrawerContent/Exam/UpdateExam/SelectExamType";
import SelectSchoolYear from "../../../DrawerContent/Exam/UpdateExam/SelectSchoolYear";
export const UPDATE_EXAM_STEP_FLOW = [
  {
    step: "SELECT_EXAM_TYPE",
    lable: "Select Exam",
    component: SelectExamType,
  },
  {
    step: "SELECT_ACADEMIC_YEAR",
    lable: "Select Academic Year",
    component: SelectSchoolYear,
  },
  {
    step: "UPDATE_EXAM",
    label: "Update Exam",
    component: UpdateExam,
  }
];

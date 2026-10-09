import SelectExamType from "../../../DrawerContent/Exam/CreateExam/SelectExamType";
import CreateExam from "../../../DrawerContent/Exam/CreateExam/CreateExam";
import SelectSchoolYear from "../../../DrawerContent/Exam/CreateExam/SelectSchoolYear";
export const CREATE_EXAM_STEP_FLOW = [
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
    step: "CREATE_EXAM",
    label: "Create Exam",
    component: CreateExam,
  },
];

import SelectExamType from "../../../DrawerContent/Exam/CreateExam/SelectExamType";
import CreateExam from "../../../DrawerContent/Exam/CreateExam/CreateExam";
import SelectSchoolYear from "../../../DrawerContent/Exam/CreateExam/SelectSchoolYear";

// `requires` lists the createExam state fields that must be selected before a step can render
export const CREATE_EXAM_STEP_FLOW = [
  {
    step: "SELECT_EXAM_TYPE",
    label: "Select Exam",
    component: SelectExamType,
    requires: [],
  },
  {
    step: "SELECT_ACADEMIC_YEAR",
    label: "Select Academic Year",
    component: SelectSchoolYear,
    requires: ["examType"],
  },
  {
    step: "CREATE_EXAM",
    label: "Create Exam",
    component: CreateExam,
    requires: ["examType", "academicYear"],
  },
];

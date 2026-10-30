import UpdateExam from "../../../DrawerContent/Exam/UpdateExam/UpdateExam";
import SelectExamType from "../../../DrawerContent/Exam/UpdateExam/SelectExamType";
import SelectSchoolYear from "../../../DrawerContent/Exam/UpdateExam/SelectSchoolYear";

// `requires` lists the createExam state fields that must be selected before a step can render
export const UPDATE_EXAM_STEP_FLOW = [
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
    step: "UPDATE_EXAM",
    label: "Update Exam",
    component: UpdateExam,
    requires: ["examType", "academicYear"],
  },
];

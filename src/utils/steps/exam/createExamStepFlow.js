import SelectSchoolSemester from "../../../DrawerContent/Exam/CreateExam/SelectSchoolSemester";
import SelectExamType from "../../../DrawerContent/Exam/CreateExam/SelectExamType";
import CreateExam from "../../../DrawerContent/Exam/CreateExam/CreateExam";

// `requires` lists the createExam state fields that must be selected before a step can render
export const CREATE_EXAM_STEP_FLOW = [
  {
    step: "SELECT_SCHOOL_SEMESTER",
    label: "Select Semester",
    component: SelectSchoolSemester,
    requires: [],
  },
  {
    step: "SELECT_EXAM_TYPE",
    label: "Select Exam",
    component: SelectExamType,
    requires: ["schoolSemester"],
  },
  {
    step: "CREATE_EXAM",
    label: "Create Exam",
    component: CreateExam,
    requires: ["schoolSemester", "examType"],
  },
];

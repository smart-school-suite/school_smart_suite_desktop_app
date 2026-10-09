import ReviewGradeScale from "../../../DrawerContent/ResitExam/ConfigureGradeScale/ReviewGradeScale";
import SelectGradeScale from "../../../DrawerContent/ResitExam/ConfigureGradeScale/SelectGradeScale";
export const CONFIGURE_GRADE_SCALE_STEP_FLOW = [
  {
    step: "SELECT_GRADE_SCALE",
    lable: "Select Grade Scale",
    component: SelectGradeScale,
  },
  {
    step: "REVIEW_GRADE_SCALE",
    label: "Review Grade Scale",
    component: ReviewGradeScale,
  },
];

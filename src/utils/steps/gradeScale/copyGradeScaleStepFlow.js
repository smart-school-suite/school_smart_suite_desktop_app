import SelectScale from "../../../DrawerContent/GradeScale/CopyScale/SelectScale";
import ReviewScale from "../../../DrawerContent/GradeScale/CopyScale/ReviewScale";

export const COPY_GRADE_SCALE_STEP_FLOW = [
  {
    step: "SELECT SCALE",
    lable: "Select Scale",
    component: SelectScale,
  },
  {
    step: "REVIEW_SCALE",
    label: "Review Scale",
    component: ReviewScale,
  },
];

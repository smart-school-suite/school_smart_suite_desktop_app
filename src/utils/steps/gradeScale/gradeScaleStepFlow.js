import GradeList from "../../../DrawerContent/GradeScale/GradeList";
import ScaleSetup from "../../../DrawerContent/GradeScale/ScaleSetup";
import GradeEditor from "../../../DrawerContent/GradeScale/GradeEditor";
export const GRADE_SCALE_STEP_FLOW = [
  {
    step: "SCALE_SETUP",
    lable: "Scale Setup",
    component: ScaleSetup,
  },
  {
    step: "GRADE_LIST",
    label: "Grade List",
    component: GradeList,
  },
  {
    step: "GRADE_EDITOR",
    label: "Grade Editor",
    component: GradeEditor,
  },
];

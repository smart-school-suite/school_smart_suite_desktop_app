import ScaleSetup from "../../../DrawerContent/GradeScale/UpdateGradeScale/ScaleSetup";
import GradeEditor from "../../../DrawerContent/GradeScale/UpdateGradeScale/GradeEditor";
import GradeList from "../../../DrawerContent/GradeScale/UpdateGradeScale/GradeList";
export const UPDATE_GRADE_SCALE_STEP_FLOW = [
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

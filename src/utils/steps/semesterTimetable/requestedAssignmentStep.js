import RequestedAssignmentBuilderStep from "../../../DrawerContent/SemesterTimetable/Constraints/RequestedAssignment/RequestedAssignmentBuilderStep";
import RequestedAssignmentDayStep from "../../../DrawerContent/SemesterTimetable/Constraints/RequestedAssignment/RequestedAssignmentDayStep";
import RequestedAssignmentIntroductionStep from "../../../DrawerContent/SemesterTimetable/Constraints/RequestedAssignment/RequestedAssignmentIntroductionStep";
import RequestedAssignmentListStep from "../../../DrawerContent/SemesterTimetable/Constraints/RequestedAssignment/RequestedAssignmentListStep";
import RequestedAssignmentReviewStep from "../../../DrawerContent/SemesterTimetable/Constraints/RequestedAssignment/RequestedAssignmentReviewStep";

export const REQUESTED_ASSIGNMENT_STEP_FLOW = [
  {
    step: "REQUESTED_ASSIGNMENT_INTRODUCTION_STEP",
    lable: "Requested Assignment Introduction Step",
    component: RequestedAssignmentIntroductionStep,
  },
  {
    step: "REQUESTED_ASSIGNMENT_DAYS",
    lable: "Requested Assigment Days",
    component: RequestedAssignmentDayStep,
  },
  {
    step: "REQUESTED_ASSIGNMENT_LIST_STEP",
    label: "Requested Assignment List Step",
    component: RequestedAssignmentListStep,
  },
  {
     step:"REQUESTED_ASSIGNMENT_BUILDER_STEP",
     label:"Requested Assignment Builder Step",
     component: RequestedAssignmentBuilderStep
  },
  {
     step:"REQUESTED_ASSIGNMENT_REVIEW_STEP",
     label:"Requested Assignment Review Step",
     component: RequestedAssignmentReviewStep
  }
];

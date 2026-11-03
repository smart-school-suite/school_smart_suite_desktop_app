import RequestedAssignmentBuilderStep from "../../../DrawerContent/SemesterTimetable/Constraints/RequestedAssignment/RequestedAssignmentBuilderStep";
import RequestedAssignmentDayStep from "../../../DrawerContent/SemesterTimetable/Constraints/RequestedAssignment/RequestedAssignmentDayStep";
import RequestedAssignmentIntroductionStep from "../../../DrawerContent/SemesterTimetable/Constraints/RequestedAssignment/RequestedAssignmentIntroductionStep";
import RequestedAssignmentReviewStep from "../../../DrawerContent/SemesterTimetable/Constraints/RequestedAssignment/RequestedAssignmentReviewStep";

export const REQUESTED_ASSIGNMENT_STEP_FLOW = [
  {
    step: "REQUESTED_ASSIGNMENT_INTRODUCTION_STEP",
    title: "Overview",
    label: "Requested Assignment Introduction Step",
    component: RequestedAssignmentIntroductionStep,
  },
  {
    step: "REQUESTED_ASSIGNMENT_DAYS",
    title: "Days",
    label: "Requested Assigment Days",
    component: RequestedAssignmentDayStep,
  },
  {
    step: "REQUESTED_ASSIGNMENT_BUILDER_STEP",
    title: "Requests",
    label: "Requested Assignment Builder Step",
    component: RequestedAssignmentBuilderStep,
  },
  {
    step: "REQUESTED_ASSIGNMENT_REVIEW_STEP",
    title: "Review & save",
    label: "Requested Assignment Review Step",
    component: RequestedAssignmentReviewStep,
  },
];

import EventAudience from "../../../DrawerContent/SchoolEvent/CreateSchoolEvent/EventAudience";
import EventContent from "../../../DrawerContent/SchoolEvent/CreateSchoolEvent/EventContent";
import EventReview from "../../../DrawerContent/SchoolEvent/CreateSchoolEvent/EventReview";
export const CREATE_SCHOOL_EVENT_STEP_FLOW = [
  {
    step: "SCHOOL_EVENT_CONTENT",
    lable: "School Event Content",
    component: EventContent,
  },
  {
    step: "SCHOOL_EVENT_AUDIENCE",
    lable: "School Event Audience",
    component: EventAudience,
  },
  {
    step: "REVIEW_SCHOOL_EVENT",
    label: "Review Announcement",
    component: EventReview,
  },
];

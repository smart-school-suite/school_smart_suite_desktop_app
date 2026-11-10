import EventAudience from "../../../DrawerContent/SchoolEvent/CreateSchoolEvent/EventAudience";
import EventContent from "../../../DrawerContent/SchoolEvent/CreateSchoolEvent/EventContent";
import EventImages from "../../../DrawerContent/SchoolEvent/CreateSchoolEvent/EventImages";
import EventReview from "../../../DrawerContent/SchoolEvent/CreateSchoolEvent/EventReview";
export const CREATE_SCHOOL_EVENT_STEP_FLOW = [
  {
    step: "SCHOOL_EVENT_CONTENT",
    label: "School Event Content",
    shortLabel: "Content",
    component: EventContent,
  },
  {
    step: "SCHOOL_EVENT_IMAGES",
    label: "School Event Images",
    shortLabel: "Images",
    component: EventImages,
  },
  {
    step: "SCHOOL_EVENT_AUDIENCE",
    label: "School Event Invitees",
    shortLabel: "Invitees",
    component: EventAudience,
  },
  {
    step: "REVIEW_SCHOOL_EVENT",
    label: "Review School Event",
    shortLabel: "Review",
    component: EventReview,
  },
];

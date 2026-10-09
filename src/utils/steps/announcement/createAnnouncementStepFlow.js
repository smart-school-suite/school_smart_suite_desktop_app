import AnnouncementReview from "../../../DrawerContent/Announcement/CreateAnnouncement/AnnouncementReview";
import AnnouncementAudience from "../../../DrawerContent/Announcement/CreateAnnouncement/AnnouncementAudience";
import AnnouncementContent from "../../../DrawerContent/Announcement/CreateAnnouncement/AnnouncementContent";

export const CREATE_ANNOUNCEMENT_STEP_FLOW = [
  {
    step: "ANNOUNCEMENT_CONTENT",
    lable: "Announcement Content",
    component: AnnouncementContent,
  },
  {
    step: "ANNOUNCEMENT_AUDIENCE",
    lable: "Announcement Audience",
    component: AnnouncementAudience,
  },
  {
    step: "REVIEW_ANNOUNCEMENT",
    label: "Review Announcement",
    component: AnnouncementReview,
  },
];

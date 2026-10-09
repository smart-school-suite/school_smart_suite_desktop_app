import DraftAnnouncementAudience from "../../../DrawerContent/Announcement/UpdateDraftAnnouncement/DraftAnnouncementAudience";
import DraftAnnouncementReview from "../../../DrawerContent/Announcement/UpdateDraftAnnouncement/DraftAnnouncementReview";
import DraftAnnouncementContent from "../../../DrawerContent/Announcement/UpdateDraftAnnouncement/DraftAnnouncementContent";

export const UPDATE_DRAFT_ANNOUNCEMENT_STEP_FLOW = [
  {
    step: "ANNOUNCEMENT_CONTENT",
    lable: "Announcement Content",
    component: DraftAnnouncementContent,
  },
  {
    step: "ANNOUNCEMENT_AUDIENCE",
    lable: "Announcement Audience",
    component: DraftAnnouncementAudience,
  },
  {
    step: "REVIEW_ANNOUNCEMENT",
    label: "Review Announcement",
    component: DraftAnnouncementReview,
  },
];

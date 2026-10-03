import StudentTarget from "../../../DrawerContent/Announcement/UpdateDraftAnnouncement/Target/StudentTarget";
import TeacherTarget from "../../../DrawerContent/Announcement/UpdateDraftAnnouncement/Target/TeacherTarget";
import SchoolAdminTarget from "../../../DrawerContent/Announcement/UpdateDraftAnnouncement/Target/SchoolAdminTarget";

export const ANNOUNCEMENT_DRAFT_TARGET_MAP = {
  students: {
    component: StudentTarget,
  },
  teachers: {
    component: TeacherTarget,
  },
  schoolAdmins: {
    component: SchoolAdminTarget,
  },
};

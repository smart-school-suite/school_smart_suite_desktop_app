import SchoolAdminTarget from "../../../DrawerContent/Announcement/CreateAnnouncement/Target/SchoolAdminTarget";
import TeacherTarget from "../../../DrawerContent/Announcement/CreateAnnouncement/Target/TeacherTarget";
import StudentTarget from "../../../DrawerContent/Announcement/CreateAnnouncement/Target/StudentTarget";
export const ANNOUNCEMENT_TARGET_MAP = {
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

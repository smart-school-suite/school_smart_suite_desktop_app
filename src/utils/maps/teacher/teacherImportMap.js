import TeacherSpecialtyImportTrigger from "../../../importTrigger/Teacher/TeacherSpecialtyImportTrigger";
import TeacherTimePrefImportTrigger from "../../../importTrigger/Teacher/TeacherTimePrefImportTrigger";
import TeacherCourseImportTrigger from "../../../importTrigger/Teacher/TeacherCourseImportTrigger";
import TeacherImportTrigger from "../../../importTrigger/Teacher/TeacherImportTrigger";

export const TEACHER_IMPORT_TRIGGER_MAP = {
  "/teacher": {
    component: TeacherImportTrigger,
  },
  "/teacher-course": {
    component: TeacherCourseImportTrigger,
  },
  "/teacher-specialty": {
    component: TeacherSpecialtyImportTrigger,
  },
  "/teacher-availability": {
     component: TeacherTimePrefImportTrigger
  }
};

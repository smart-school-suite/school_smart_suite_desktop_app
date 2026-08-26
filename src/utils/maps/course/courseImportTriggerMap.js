import JointCourseImportTrigger from "../../../importTrigger/Course/JointCourseImportTrigger";
import CourseImportTrigger from "../../../importTrigger/Course/CourseImportTrigger";

export const COURSE_IMPORT_TRIGGER_MAP = {
  "/courses": {
    component: CourseImportTrigger,
  },
  "/joint-course": {
    component: JointCourseImportTrigger,
  },
};

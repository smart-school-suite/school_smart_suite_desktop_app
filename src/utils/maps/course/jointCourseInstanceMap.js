import { courseTypeInstance } from "../../instance/course/jointCourseInstance";
import { specialtyInstance } from "../../instance/course/jointCourseInstance";

export const jointCourseInstanceMap = [
  {
    key: "course_types",
    label: "Course Types",
    instance: courseTypeInstance,
  },
  {
    key: "specialties",
    label: "specialties",
    instance: specialtyInstance,
  },
];

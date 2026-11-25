import { importTeacher } from "../../../services/teacher";
import { importDepartment } from "../../../services/department";
import { importSpecialty } from "../../../services/specialty";
import { importHall } from "../../../services/hall";
import { importCourse } from "../../../services/course";
import { importStudent } from "../../../services/student";
import { importTeacherSpecialty } from "../../../services/teacherSpecialty";
import { importGradeScale } from "../../../services/gradeScale";
import {
  importSchoolAdmin,
  importTeacherCourse,
} from "../../../services/import";

/**
 * One entry per import, keyed by the module's redux state key (the
 * `moduleState` the import wizard is opened with).
 *
 * queryKey (+ refreshKeys): data refreshed when the import job finishes.
 * template: CSV shipped in /public that the upload step offers to download.
 */
const teacherConfig = {
  mutationFn: importTeacher,
  queryKey: ["teachers"],
  title: "Teacher Import",
  template: {
    path: "/import/templates/teacher_import_template.csv",
    fileName: "teacher_import_template.csv",
  },
};

const IMPORT_CONFIG_MAP = {
  department: {
    mutationFn: importDepartment,
    queryKey: ["departments"],
    title: "Department Import",
  },
  teacher: teacherConfig,
  teachers: teacherConfig,
  schoolAdmin: {
    mutationFn: importSchoolAdmin,
    queryKey: ["schoolAdmins"],
    title: "School Admin Import",
    template: {
      path: "/import/templates/school_admin_import_template.csv",
      fileName: "school_admin_import_template.csv",
    },
  },
  teacherSpecialty: {
    mutationFn: importTeacherSpecialty,
    queryKey: ["teachersBySpecialty"],
    refreshKeys: [["teachers"]],
    title: "Teacher Specialty Import",
    template: {
      path: "/import/templates/teacher_specialty_import_template.csv",
      fileName: "teacher_specialty_import_template.csv",
    },
  },
  teacherCourse: {
    mutationFn: importTeacherCourse,
    queryKey: ["course-specialty"],
    refreshKeys: [["teachers"]],
    title: "Teacher Course Import",
    template: {
      path: "/import/templates/teacher_course_import_template.csv",
      fileName: "teacher_course_import_template.csv",
    },
  },
  specialty: {
    mutationFn: importSpecialty,
    queryKey: ["specialties"],
    title: "Specialty Import",
  },
  hall: {
    mutationFn: importHall,
    queryKey: ["hall"],
    title: "Hall Import",
  },
  course: {
    mutationFn: importCourse,
    queryKey: ["courses"],
    title: "Course Import",
  },
  student: {
    mutationFn: importStudent,
    queryKey: ["students"],
    title: "Student Import",
  },
  gradeScale: {
    mutationFn: importGradeScale,
    queryKey: ["grade-scale"],
    title: "Grade Scale Import",
  },
};

const getImportConfig = (type) => {
  const config = IMPORT_CONFIG_MAP[type];
  if (!config) {
    throw new Error(
      `getImportConfig: no import config found for type "${type}"`,
    );
  }
  return config;
};

export { IMPORT_CONFIG_MAP, getImportConfig };

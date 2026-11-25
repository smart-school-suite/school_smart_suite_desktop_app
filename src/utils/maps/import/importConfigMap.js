import { importTeacher } from "../../../services/teacher";
import { importDepartment } from "../../../services/department";
import { importSpecialty } from "../../../services/specialty";
import { importHall } from "../../../services/hall";
import { importCourse } from "../../../services/course";
import { importStudent } from "../../../services/student";
import { importTeacherSpecialty } from "../../../services/teacherSpecialty";
import { importGradeScale } from "../../../services/gradeScale";
import {
  importJointCourse,
  importParent,
  importSchoolAdmin,
  importSpecialtyHall,
  importStudentBatch,
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
    template: {
      path: "/import/templates/department_import_template.csv",
      fileName: "department_import_template.csv",
    },
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
    refreshKeys: [["specialty-hall-specialties"]],
    title: "Specialty Import",
    template: {
      path: "/import/templates/specialty_import_template.csv",
      fileName: "specialty_import_template.csv",
    },
  },
  hall: {
    mutationFn: importHall,
    queryKey: ["halls"],
    title: "Hall Import",
    template: {
      path: "/import/templates/hall_import_template.csv",
      fileName: "hall_import_template.csv",
    },
  },
  hallSpecialty: {
    mutationFn: importSpecialtyHall,
    queryKey: ["specialty-hall-specialties"],
    refreshKeys: [["halls"]],
    title: "Specialty Hall Import",
    template: {
      path: "/import/templates/specialty_hall_import_template.csv",
      fileName: "specialty_hall_import_template.csv",
    },
  },
  course: {
    mutationFn: importCourse,
    queryKey: ["courses"],
    refreshKeys: [["activeCourses"]],
    title: "Course Import",
    template: {
      path: "/import/templates/course_import_template.csv",
      fileName: "course_import_template.csv",
    },
  },
  jointCourse: {
    mutationFn: importJointCourse,
    queryKey: ["joint-courses"],
    refreshKeys: [["courses"]],
    title: "Joint Course Import",
    template: {
      path: "/import/templates/joint_course_import_template.csv",
      fileName: "joint_course_import_template.csv",
    },
  },
  student: {
    mutationFn: importStudent,
    queryKey: ["students"],
    refreshKeys: [["registrationFees"], ["tuitionFees"]],
    title: "Student Import",
    template: {
      path: "/import/templates/student_import_template.csv",
      fileName: "student_import_template.csv",
    },
  },
  parent: {
    mutationFn: importParent,
    queryKey: ["parents"],
    title: "Guardian Import",
    template: {
      path: "/import/templates/guardian_import_template.csv",
      fileName: "guardian_import_template.csv",
    },
  },
  studentBatch: {
    mutationFn: importStudentBatch,
    queryKey: ["studentBatches"],
    title: "Student Batch Import",
    template: {
      path: "/import/templates/student_batch_import_template.csv",
      fileName: "student_batch_import_template.csv",
    },
  },
  gradeScale: {
    mutationFn: importGradeScale,
    queryKey: ["grade-scale-categories"],
    refreshKeys: [["grade-scale-category"], ["grade-scale-categories-active"]],
    title: "Grade Scale Import",
    template: {
      path: "/import/templates/grade_scale_import_template.csv",
      fileName: "grade_scale_import_template.csv",
    },
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

import { importTeacher } from "../../../services/teacher";
import { importDepartment } from "../../../services/department";
import { importSpecialty } from "../../../services/specialty";
import { importHall } from "../../../services/hall";
import { importCourse } from "../../../services/course";
import { importStudent } from "../../../services/student";
const IMPORT_CONFIG_MAP = {
  department: {
    mutationFn: importDepartment,
    queryKey: ["departments"],
    successTitle: "Import Initiated",
    successDescription: "Department Importation Initiated Successfully",
  },
  teacher: {
    mutationFn: importTeacher,
    queryKey: ["teachers"],
    successTitle: "Import Initiated",
    successDescription: "Teacher Importation Initiated Successfully",
  },
  specialty: {
    mutationFn: importSpecialty,
    queryKey: ["specialties"],
    successTitle: "Import Initiated",
    successDescription: "Specialty Importation Initiated Successfully",
  },
  hall: {
    mutationFn: importHall,
    queryKey: ["hall"],
    successTitle: "Import Initiated",
    successDescription: "Hall Importation Initiated Successfully",
  },
  course: {
    mutationFn: importCourse,
    queryKey: ["courses"],
    successTitle: "Import Initiated",
    successDescription: "Course Importation Initiated Successfully",
  },
  student: {
    mutationFn: importStudent,
    queryKey: ["students"],
    successTitle: "Import Initiated",
    successDescription: "Student Importation Initiated Successfully",
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

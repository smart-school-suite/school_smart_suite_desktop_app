import { importTeacher } from "../../../services/teacher";
import { importDepartment } from "../../../services/department";

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

export { IMPORT_CONFIG_MAP, getImportConfig }

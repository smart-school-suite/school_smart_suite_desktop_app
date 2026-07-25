import TeacherImport from "../../../ModalContent/Teacher/Import/TeacherImport";
import TeacherImportColumnMatch from "../../../ModalContent/Teacher/Import/TeacherImportColumnMatch";
import TeacherImportFileUpload from "../../../ModalContent/Teacher/Import/TeacherImportFileUpload";
import TeacherImportReview from "../../../ModalContent/Teacher/Import/TeacherImportReview";

export const TEACHER_IMPORT_STEP_FLOW = [
  {
    step: "FILE_UPLOAD",
    lable: "File Upload",
    component: TeacherImportFileUpload,
  },
  {
    step: "COLUMN_MATCH",
    label: "Column Match",
    component: TeacherImportColumnMatch,
  },
  {
    step: "REVIEW",
    label: "Review",
    component: TeacherImportReview,
  },
  {
    step: "IMPORT",
    label: "Import",
    component: TeacherImport,
  },
];

import ImportColumnMatch from "../../../ModalContent/Import/ImportColumnMatch";
import ImportFileUpload from "../../../ModalContent/Import/ImportFileUpload";
import ImportReview from "../../../ModalContent/Import/ImportReview";
export const IMPORT_STEP_FLOW = [
  {
    step: "FILE_UPLOAD",
    lable: "File Upload",
    component: ImportFileUpload,
  },
  {
    step: "COLUMN_MATCH",
    label: "Column Match",
    component: ImportColumnMatch,
  },
  {
    step: "REVIEW",
    label: "Review",
    component: ImportReview,
  }
];
import AllowedLetterGradeSetting from "../../../../DrawerContent/Setting/GradeScale/AllowedLetterGradeSetting";
import MaximumGpaSetting from "../../../../ModalContent/Setting/GradeScale/MaximumGpaSetting";
import PassingGpaSetting from "../../../../ModalContent/Setting/GradeScale/PassingGpaSetting";

export const gradeSettingMap = {
  "grade.max_gpa": {
    key: "grade.max_gpa",
    editor: "modal",
    valueType: "float",
    component: MaximumGpaSetting,
  },
  "grade.passing_gpa": {
    key: "grade.passing_gpa",
    editor: "modal",
    valueType: "float",
    component: PassingGpaSetting,
  },
  "grade.allowed_letter_grades": {
    key: "grade.allowed_letter_grades",
    editor: "drawer",
    valueType: "array",
    component: AllowedLetterGradeSetting,
  },
};

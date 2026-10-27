import Switch from "../../../../components/input/Switch";
import GraduationFeeByLevelSetting from "../../../../DrawerContent/Setting/Graduation/GraduationFeeByLevelSetting";
import GeneralGraduationFeeSetting from "../../../../ModalContent/Setting/Graduation/GeneralGraduationFeeSetting";

export const graduationSettingMap = {
  "graduation.fee_enabled": {
    key: "graduation.fee_enabled",
    editor: "switch",
    valueType: "boolean",
    component: Switch,
    mutuallyExclusiveWith: ["graduation.level_graduation_fee"],
  },
  "graduation.level_graduation_fee_enabled": {
    key: "graduation.level_graduation_fee_enabled",
    editor: "switch",
    valueType: "boolean",
    component: Switch,
    mutuallyExclusiveWith: ["graduation.fee"],
  },
  "graduation.fee": {
    key: "graduation.fee",
    editor: "modal",
    valueType: "float",
    component: GeneralGraduationFeeSetting,
    unit: "currency"
  },
  "graduation.level_graduation_fee": {
    key: "graduation.level_graduation_fee",
    editor: "drawer",
    valueType: "array",
    component: GraduationFeeByLevelSetting,
  },
};

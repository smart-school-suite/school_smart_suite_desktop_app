import Switch from "../../../../components/input/Switch";
import RegistrationFeeLevelSetting from "../../../../DrawerContent/Setting/Level/RegistrationFeeLevelSetting";
import TuitionFeeLevelSetting from "../../../../DrawerContent/Setting/Level/TuitionFeeLevelSetting";
import LevelStartSetting from "../../../../ModalContent/Setting/Level/LevelStartSetting";

export const levelSettingMap = {
  "level.start": {
    key: "level.start",
    editor: "modal",
    valueType: "string",
    component: LevelStartSetting
  },
  "specialties.auto_generate_levels": {
    key: "specialties.auto_generate_levels",
    editor: "switch",
    valueType: "boolean",
    component: Switch
  },
  "level.registration_fees": {
    key: "level.registration_fees",
    editor: "drawer",
    valueType: "array",
    component: RegistrationFeeLevelSetting
  },
  "level.tuition_fees": {
    key: "level.tuition_fees",
    editor: "drawer",
    valueType: "array",
    component: TuitionFeeLevelSetting
  },
};

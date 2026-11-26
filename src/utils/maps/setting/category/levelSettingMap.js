import { createElement } from "react";
import Switch from "../../../../components/input/Switch";
import RegistrationFeeLevelSetting from "../../../../DrawerContent/Setting/Level/RegistrationFeeLevelSetting";
import TuitionFeeLevelSetting from "../../../../DrawerContent/Setting/Level/TuitionFeeLevelSetting";
import LevelStartSetting from "../../../../ModalContent/Setting/Level/LevelStartSetting";
import AutoCreateLevelsSetting from "../../../../ModalContent/Setting/AutoCreation/AutoCreateLevelsSetting";

const isOn = (value) => value === true || value === 1 || value === "1" || value === "true";

const OfferedLevelsSetting = (props) =>
  createElement(AutoCreateLevelsSetting, {
    ...props,
    title: "Levels Offered by the School",
    description:
      "Select the levels your school runs. Only these levels can be chosen when creating specialties, importing data or setting up other options.",
    levelScope: "system",
    requireOne: true,
  });

const AutoSpecialtyLevelsSetting = (props) =>
  createElement(AutoCreateLevelsSetting, {
    ...props,
    title: "Levels for Automatic Specialty Creation",
    description:
      "When a specialty is created, it is also created at the selected levels. The level it is created for always gets it. Only levels your school offers are listed.",
    requireOne: true,
  });

export const levelSettingMap = {
  "level.start": {
    key: "level.start",
    order: 1,
    editor: "modal",
    valueType: "string",
    component: LevelStartSetting
  },
  "level.allowed_levels": {
    key: "level.allowed_levels",
    order: 2,
    editor: "modal",
    valueType: "json",
    component: OfferedLevelsSetting,
  },
  "specialties.auto_generate_levels": {
    key: "specialties.auto_generate_levels",
    order: 3,
    editor: "switch",
    valueType: "boolean",
    component: Switch
  },
  "specialties.auto_generate_for_levels": {
    key: "specialties.auto_generate_for_levels",
    order: 4,
    editor: "modal",
    valueType: "json",
    component: AutoSpecialtyLevelsSetting,
    disabledReason: (values) =>
      isOn(values["specialties.auto_generate_levels"])
        ? null
        : "Turn on Automatically Create Specialties Across All Levels to change this setting.",
  },
  "level.registration_fees": {
    key: "level.registration_fees",
    order: 5,
    editor: "drawer",
    valueType: "array",
    component: RegistrationFeeLevelSetting
  },
  "level.tuition_fees": {
    key: "level.tuition_fees",
    order: 6,
    editor: "drawer",
    valueType: "array",
    component: TuitionFeeLevelSetting
  },
};

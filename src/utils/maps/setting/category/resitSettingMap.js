import Switch from "../../../../components/input/Switch";
import LevelResitBillingFeeSetting from "../../../../DrawerContent/Setting/Resit/LevelResitBillingFeeSetting";
import GeneralResitFeeSetting from "../../../../ModalContent/Setting/Resit/GeneralResitFeeSetting";

export const resitSettingMap = {
  "resitFee.generalBilling": {
    key: "resitFee.generalBilling",
    editor: "switch",
    valueType: "boolean",
    component: Switch,
    mutuallyExclusiveWith: ["resitFee.levelBillingFee"]
  },
  "resitFee.levelBilling": {
    key: "resitFee.levelBilling",
    editor: "switch",
    valueType: "boolean",
    component: Switch,
    mutuallyExclusiveWith: ["resitFee.generalBillingFee"]
  },
  "resitFee.generalBillingFee": {
    key: "resitFee.generalBillingFee",
    editor: "modal",
    valueType: "float",
    component: GeneralResitFeeSetting,
    unit:"currency"
  },
  "resitFee.levelBillingFee": {
    key: "resitFee.levelBillingFee",
    editor: "drawer",
    valueType: "json",
    component: LevelResitBillingFeeSetting,
  },
};

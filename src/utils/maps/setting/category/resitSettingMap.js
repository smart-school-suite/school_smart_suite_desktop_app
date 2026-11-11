import Switch from "../../../../components/input/Switch";
import LevelResitBillingFeeSetting from "../../../../DrawerContent/Setting/Resit/LevelResitBillingFeeSetting";
import GeneralResitFeeSetting from "../../../../ModalContent/Setting/Resit/GeneralResitFeeSetting";

const GENERAL_BILLING_KEY = "resitFee.generalBilling";
const LEVEL_BILLING_KEY = "resitFee.levelBilling";

// The two billing switches are mutually exclusive: the API turns the other
// one off when one is turned on (and on when one is turned off), and the
// settings are refetched after each change. Each fee can only be edited
// while its billing option is the one in use.
const whileBillingOn = (billingKey, billingLabel) => (values) =>
  values[billingKey]
    ? null
    : `Turn on ${billingLabel} to change this setting.`;

export const resitSettingMap = {
  [GENERAL_BILLING_KEY]: {
    key: GENERAL_BILLING_KEY,
    order: 1,
    editor: "switch",
    valueType: "boolean",
    component: Switch,
  },
  "resitFee.generalBillingFee": {
    key: "resitFee.generalBillingFee",
    order: 2,
    editor: "modal",
    valueType: "float",
    component: GeneralResitFeeSetting,
    unit: "currency",
    disabledReason: whileBillingOn(GENERAL_BILLING_KEY, "Use a Standard Resit Fee"),
  },
  [LEVEL_BILLING_KEY]: {
    key: LEVEL_BILLING_KEY,
    order: 3,
    editor: "switch",
    valueType: "boolean",
    component: Switch,
  },
  "resitFee.levelBillingFee": {
    key: "resitFee.levelBillingFee",
    order: 4,
    editor: "drawer",
    valueType: "json",
    component: LevelResitBillingFeeSetting,
    disabledReason: whileBillingOn(LEVEL_BILLING_KEY, "Use Different Resit Fees by Academic Level"),
  },
};

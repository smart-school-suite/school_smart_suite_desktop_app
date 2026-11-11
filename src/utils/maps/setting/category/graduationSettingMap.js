import Switch from "../../../../components/input/Switch";
import GraduationFeeByLevelSetting from "../../../../DrawerContent/Setting/Graduation/GraduationFeeByLevelSetting";
import GeneralGraduationFeeSetting from "../../../../ModalContent/Setting/Graduation/GeneralGraduationFeeSetting";

const FEE_ENABLED_KEY = "graduation.fee_enabled";
const LEVEL_FEES_ENABLED_KEY = "graduation.level_graduation_fee_enabled";

const FEE_OFF_REASON = "Turn on Charge a Graduation Fee to change this setting.";

// "Charge a Graduation Fee" switches graduation fees on. While it is on,
// either the standard fee or the per-level fees apply: "Use Different
// Graduation Fees by Academic Level" chooses which, so only that fee can be
// edited.
const whileFeeEnabled = (values) => (values[FEE_ENABLED_KEY] ? null : FEE_OFF_REASON);

const whileStandardFee = (values) => {
  if (!values[FEE_ENABLED_KEY]) return FEE_OFF_REASON;
  return values[LEVEL_FEES_ENABLED_KEY]
    ? "Turn off Use Different Graduation Fees by Academic Level to change this setting."
    : null;
};

const whileLevelFees = (values) => {
  if (!values[FEE_ENABLED_KEY]) return FEE_OFF_REASON;
  return values[LEVEL_FEES_ENABLED_KEY]
    ? null
    : "Turn on Use Different Graduation Fees by Academic Level to change this setting.";
};

export const graduationSettingMap = {
  [FEE_ENABLED_KEY]: {
    key: FEE_ENABLED_KEY,
    order: 1,
    editor: "switch",
    valueType: "boolean",
    component: Switch,
  },
  "graduation.fee": {
    key: "graduation.fee",
    order: 2,
    editor: "modal",
    valueType: "float",
    component: GeneralGraduationFeeSetting,
    unit: "currency",
    disabledReason: whileStandardFee,
  },
  [LEVEL_FEES_ENABLED_KEY]: {
    key: LEVEL_FEES_ENABLED_KEY,
    order: 3,
    editor: "switch",
    valueType: "boolean",
    component: Switch,
    disabledReason: whileFeeEnabled,
  },
  "graduation.level_graduation_fee": {
    key: "graduation.level_graduation_fee",
    order: 4,
    editor: "drawer",
    valueType: "array",
    component: GraduationFeeByLevelSetting,
    disabledReason: whileLevelFees,
  },
};

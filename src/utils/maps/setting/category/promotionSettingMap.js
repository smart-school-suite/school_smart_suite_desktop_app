import Switch from "../../../../components/input/Switch";
import MaxAdditionalFeeSetting from "../../../../ModalContent/Setting/Promotion/MaxAdditionalFeeSetting";
import MaxCarryOverSetting from "../../../../ModalContent/Setting/Promotion/MaxCarryOverSetting";
import MaxResitSetting from "../../../../ModalContent/Setting/Promotion/MaxResitSetting";
import MaxTuitionFeeDebtSetting from "../../../../ModalContent/Setting/Promotion/MaxTuitionFeeDebtSetting";
import MinimumAverageGpaSetting from "../../../../ModalContent/Setting/Promotion/MinimumAverageGpaSetting";

export const promotionSettingMap = {
  "promotion.min_gpa": {
    key: "promotion.min_gpa",
    editor: "modal",
    valueType: "float",
    component: MinimumAverageGpaSetting,
  },
  "promotion.max_tuition_fee_debt": {
    key: "promotion.max_tuition_fee_debt",
    editor: "modal",
    valueType: "float",
    component: MaxTuitionFeeDebtSetting,
    unit: "currency"
  },
  "promotion.max_additional_fee_debt": {
    key: "promotion.max_additional_fee_debt",
    editor: "modal",
    valueType: "float",
    component: MaxAdditionalFeeSetting,
    unit: "currency"
  },
  "promotion.max_carry_overs": {
    key: "promotion.max_carry_overs",
    editor: "modal",
    valueType: "integer",
    component: MaxCarryOverSetting,
  },
  "promotion.max_resits": {
    key: "promotion.max_resits",
    editor: "modal",
    valueType: "integer",
    component: MaxResitSetting,
  },
  "promotion.bill_student_registration_fee": {
    key: "promotion.bill_student_registration_fee",
    editor: "switch",
    valueType: "boolean",
    component: Switch
  },
};

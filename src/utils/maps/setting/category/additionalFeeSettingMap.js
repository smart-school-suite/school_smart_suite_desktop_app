import DefaultDueDaysSetting from "../../../../ModalContent/Setting/AdditionalFee/DefaultDueDaysSetting";

export const additionalFeeSettingMap = {
  "additionalFee.default_due_days": {
    key: "additionalFee.default_due_days",
    editor: "modal",
    valueType: "integer",
    component: DefaultDueDaysSetting,
    formatValue: (value) => (Number(value) === 1 ? "1 day" : `${value ?? 0} days`),
  },
};

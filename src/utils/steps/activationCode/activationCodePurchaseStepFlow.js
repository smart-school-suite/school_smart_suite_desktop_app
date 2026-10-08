import ActivationCodePayment from "../../../DrawerContent/ActivationCode/ActivationCodePayment";
import PurchaseActivationCode from "../../../DrawerContent/ActivationCode/PurchaseActivationCode";
export const PURCHASE_ACTIVATION_CODE_STEP_FLOW = [
  {
    step: "PURCHASE_ACTIVATION_CODE",
    lable: "Purchase Activation Code",
    component: PurchaseActivationCode,
  },
  {
    step: "ACTIVATION_CODE_PAYMENT",
    lable: "Activation Code Payment",
    component: ActivationCodePayment,
  },
];

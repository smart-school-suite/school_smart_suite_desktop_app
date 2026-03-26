import OrangePaymentMethod from "../ModalContent/ActivationCodePaymentMethod/OrangePaymentMethod";
import MtnPaymentMethod from "../ModalContent/ActivationCodePaymentMethod/MtnPaymentMethod";
export const activationCodePaymentMethodComp = [
  {
    key: "mtn_mobile_money",
    component: MtnPaymentMethod,
  },
  {
    key: "orange_mobile_money",
    component: OrangePaymentMethod,
  },
];

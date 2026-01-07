import MtnPaymentMethod from "../ModalContent/PaymentMethod/MtnPaymentMethod";
import OrangePaymentMethod from "../ModalContent/PaymentMethod/OrangePaymentMethod";

export const paymentMethodComp = [
    {
         "key":"mtn_mobile_money",
         "component":MtnPaymentMethod
    },
    {
        "key":"orange_mobile_money",
        "component":OrangePaymentMethod
    }
]
import SubscriptionReview from "../../../DrawerContent/Subscription/SubscriptionCheckout/SubscriptionReview";
import SubscriptionPayment from "../../../DrawerContent/Subscription/SubscriptionCheckout/SubscriptionPayment";

export const SUBSCRIPTION_CHECKOUT_STEP_FLOW = [
  {
    step: "SUBSCRIPTION_REVIEW",
    lable: "Subscription Review",
    component: SubscriptionReview,
  },
  {
    step: "SUBSCRIPTION_PAYMENT",
    lable: "Subscription Payment",
    component: SubscriptionPayment,
  }
];

import { renewSubscriptionPlan, upgradeSubscriptionPlan } from "../../services/subscription";
import { closeAfter, useElectionMutation } from "../election/useElectionMutation";
import { SUBSCRIPTION_STATE_KEYS } from "./subscriptionQueryKeys";

export const useUpgradePlan = (handleClose) =>
  useElectionMutation({
    mutationFn: upgradeSubscriptionPlan,
    invalidate: SUBSCRIPTION_STATE_KEYS,
    successTitle: "Plan Upgraded",
    successDescription: "Your new limits are active right away.",
    onSuccess: closeAfter(handleClose),
  });

export const useRenewPlan = (handleClose) =>
  useElectionMutation({
    mutationFn: renewSubscriptionPlan,
    invalidate: SUBSCRIPTION_STATE_KEYS,
    successTitle: "Subscription Renewed",
    successDescription: (data) =>
      data?.data?.end_date ? `Your plan now runs until ${data.data.end_date}.` : data?.message,
    onSuccess: closeAfter(handleClose),
  });

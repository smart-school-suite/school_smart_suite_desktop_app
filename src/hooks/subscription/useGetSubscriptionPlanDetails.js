import { useQuery } from "@tanstack/react-query";
import { getSubscriptionPlanDetails } from "../../services/subscription";

export const useGetSubscriptionPlanDetails = (planId) => {
  return useQuery({
    queryKey: ["subscriptionPlan", planId],
    queryFn: () => getSubscriptionPlanDetails(planId),
  });
};

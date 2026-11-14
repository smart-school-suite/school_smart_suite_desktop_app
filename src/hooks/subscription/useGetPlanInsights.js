import { useQuery } from "@tanstack/react-query";
import { getPlanInsights } from "../../services/subscription";
import { subscriptionKeys } from "./subscriptionQueryKeys";

export const useGetPlanInsights = (options = {}) =>
  useQuery({
    queryKey: subscriptionKeys.planInsights(),
    queryFn: getPlanInsights,
    select: (response) => response?.data,
    ...options,
  });

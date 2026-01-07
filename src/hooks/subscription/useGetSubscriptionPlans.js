import { useQuery } from "@tanstack/react-query";
import { getSubscriptionPlans } from "../../services/subscription";

export const useGetSubscriptionPlans = (countryId) => {
      return useQuery({
          queryKey:["subscriptionPlans"],
          queryFn:() => getSubscriptionPlans(countryId)
      });
}
import { useQuery } from "@tanstack/react-query";
import { getSubscriptionRates } from "../../services/subscription";

export const useGetSubscriptonRates = () => {
     return useQuery({
         queryKey:['subscriptionRates'],
         queryFn:() => getSubscriptionRates()
     })
}
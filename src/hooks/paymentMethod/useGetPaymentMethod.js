import { useQuery } from "@tanstack/react-query";
import { getPaymentMethods } from "../../services/paymentMethod";

export const useGetPaymentMethod = (countryId) => {
       return useQuery({
          queryKey:["paymentMethod"],
          queryFn:() => getPaymentMethods(countryId)
       })
}
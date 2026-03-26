import { useQuery } from "@tanstack/react-query";
import { getRegistrationFeeTransactions } from "../../services/registrationFee";

export const useGetRegistrationFeeTransations = () => {
    return useQuery({
         queryKey:["registrationFeeTransactions"],
         queryFn:() => getRegistrationFeeTransactions()
    })
}
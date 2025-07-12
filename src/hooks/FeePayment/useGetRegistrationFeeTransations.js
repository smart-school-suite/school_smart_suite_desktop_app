import { useQuery } from "@tanstack/react-query";
import { getRegistrationFeeTransactions } from "../../services/feePayment";

export const useGetRegistrationFeeTransations = () => {
    return useQuery({
         queryKey:["registrationFeeTransactions"],
         queryFn:getRegistrationFeeTransactions
    })
}
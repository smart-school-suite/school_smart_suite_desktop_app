import { useQuery } from "@tanstack/react-query";
import { getRegistrationFeeTransactionDetails } from "../../services/feePayment";

export const useGetRegistrationFeeTransactionDetails = (transactionId) => {
     return useQuery({
         queryKey:["registrationFeeTransaction", transactionId],
         queryFn:() => getRegistrationFeeTransactionDetails(transactionId)
     })
}
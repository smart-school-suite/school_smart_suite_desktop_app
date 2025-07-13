import { useQuery } from "@tanstack/react-query";
import { getTransactionDetails } from "../../services/studentResit";

export const useGetTransactionDetails = (transactionId) => {
    return useQuery({
         queryKey:["resitTransaction", transactionId],
         queryFn:getTransactionDetails(transactionId)
    })
}
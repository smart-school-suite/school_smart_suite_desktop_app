import { useQuery } from "@tanstack/react-query";
import { getTuitionTransactionFeeDetails } from "../../services/feePayment";

export const useGetTuitionFeeTransactionDetails = (transactionId) => {
    return useQuery({
         queryKey:["tuitionFeeTransaction", transactionId],
         queryFn:getTuitionTransactionFeeDetails(transactionId)
    })
}
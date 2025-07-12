import { useQuery } from "@tanstack/react-query";
import { getTuitionFeeTransactions } from "../../services/feePayment";

export const useGetTuitionFeeTransactions = () => {
    return useQuery({
         queryKey:["tuitionFeeTransactions"],
         queryFn:getTuitionFeeTransactions
    })
}
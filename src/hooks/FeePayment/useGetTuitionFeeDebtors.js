import { useQuery } from "@tanstack/react-query";
import { getFeeDebtors } from "../../services/feePayment";

export const useGetFeeDebtors = () => {
    return useQuery({
         queryKey:["tuitionFeeDebtors"],
         queryFn:getFeeDebtors
    })
}
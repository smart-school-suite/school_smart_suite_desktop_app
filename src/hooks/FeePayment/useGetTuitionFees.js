import { useQuery } from "@tanstack/react-query";
import { getTuitionFees } from "../../services/feePayment";

export const useGetTuitionFees = () => {
    return useQuery({
         queryKey:["tuitionFees"],
         queryFn:getTuitionFees
    })
}
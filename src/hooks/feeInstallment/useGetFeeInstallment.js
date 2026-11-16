import { useQuery } from "@tanstack/react-query";
import { getFeeInstallments } from "../../services/feeInstallment";

export const useGetFeeInstallment = (options = {}) => {
    return useQuery({
         queryKey:["feeInstallments"],
         queryFn:() => getFeeInstallments(),
         ...options,
    })
}

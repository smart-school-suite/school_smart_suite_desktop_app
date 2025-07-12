import { useQuery } from "@tanstack/react-query";
import { getFeesPaid } from "../../services/feePayment";

export const useGetFeesPaid = () => {
    return useQuery({
         queryKey:["feesPaid"],
         queryFn:getFeesPaid
    })
}
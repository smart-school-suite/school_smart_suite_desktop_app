import { useQuery } from "@tanstack/react-query";
import { getResitPaymentTransactions } from "../../services/studentResit";

export const useGetResitTransactions = () => {
    return useQuery({
        queryKey:["resitTransactions"],
        queryFn:() => getResitPaymentTransactions()
    })
}
import { useQuery } from "@tanstack/react-query";
import { getAdditionalFeeTransactions } from "../../services/additionalFee";

export const useGetAdditionalFeeTransactions = () => {
     return useQuery({
            queryKey: ["additionalFeeTransactions"],
            queryFn:  getAdditionalFeeTransactions,
    }); 
}
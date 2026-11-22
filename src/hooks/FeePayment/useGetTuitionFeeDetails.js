import { getTuitionFeeDetails } from "../../services/feePayment";
import { useQuery } from "@tanstack/react-query";
export const useGetTuitionFeeDetails = (feeId) => {
      return useQuery({
         queryKey:["tuitionFeeDetails", feeId],
         queryFn:() => getTuitionFeeDetails(feeId)
      })
}
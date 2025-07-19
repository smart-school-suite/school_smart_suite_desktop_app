import { useQuery } from "@tanstack/react-query";
import { getStudentAdditionalFees } from "../../services/additionalFee";

export const useGetAdditionalFees = () => {
    return useQuery({
        queryKey: ["additionalFees"],
        queryFn:  () => getStudentAdditionalFees(),
      }); 
}
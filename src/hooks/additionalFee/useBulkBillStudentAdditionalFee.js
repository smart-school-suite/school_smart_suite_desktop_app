import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkBillStudentAdditionalFee } from "../../services/additionalFee";

export const useBulkBillStudentAdditionalFee = () => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn: bulkBillStudentAdditionalFee,
         onSuccess: () => {
             queryClient.invalidateQueries({ queryKey:["additionalFees"] })
         } 
     });
}
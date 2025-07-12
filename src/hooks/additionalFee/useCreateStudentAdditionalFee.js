import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createStudentAdditionalFee } from "../../services/additionalFee";

export const useCreateStudentAdditionalFee = () => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn:createStudentAdditionalFee,
         onSuccess: () => {
             queryClient.invalidateQueries({ queryKey:["additionalFees"] })
         }
     })
}

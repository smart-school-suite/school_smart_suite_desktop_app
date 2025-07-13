import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createStudentBatch } from "../../services/studentBatch";

export const useCreateStudentBatch = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:createStudentBatch,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["studentBatches"] })
         }
    })
}
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteStudentBatch } from "../../services/studentBatch";

export const useDeleteBatch = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:deleteStudentBatch,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["studentBatches"] })
         }
    })
}
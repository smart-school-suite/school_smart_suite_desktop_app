import { deactivateStudentBatch } from "../../services/studentBatch";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeactivateBatch = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:(batchId) => deactivateStudentBatch(batchId),
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["studentBatches"] })
         }
    })
}
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkActivateStudentBatch } from "../../services/studentBatch";

export const useBulkActivateBatch = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:bulkActivateStudentBatch,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["studentBatches"] })
         }
    })
}
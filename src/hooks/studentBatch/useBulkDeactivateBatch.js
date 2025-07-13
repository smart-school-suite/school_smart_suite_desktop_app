import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkDeactivateStudentBatch } from "../../services/studentBatch";

export const useBulkDeactivateBatch = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:bulkDeactivateStudentBatch,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["studentBatches"]})
         }
    })
}
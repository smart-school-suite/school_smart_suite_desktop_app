import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkUpdateStudentBatch } from "../../services/studentBatch";

export const useBulkUpdateBatch = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:bulkUpdateStudentBatch,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["studentBatches"] })
         }
    })
}
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkDeleteStudentBatch } from "../../services/studentBatch";

export const useBulkDeleteBatch = () => {
    const queryClient = useQueryClient();
    return useMutation({ 
        mutationFn:bulkDeleteStudentBatch,
        onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["studentBatches"] })
        }
    })
}
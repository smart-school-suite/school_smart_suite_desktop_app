import { useMutation, useQueryClient } from "@tanstack/react-query";
import { activateStudentBatch } from "../../services/studentBatch";

export const useActivateBatch = () => {
    const queryClient = useQueryClient();
    return useMutation({ 
        mutationFn:(batchId) => activateStudentBatch(batchId),
        onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["studentBatches"]})
        }
    })
}
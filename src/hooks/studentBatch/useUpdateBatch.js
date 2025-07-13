import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStudentBatch } from "../../services/studentBatch";

export const useUpdateBatch = () => {
    const  queryClient = useQueryClient();
    return useMutation({
         mutationFn:({ batchId, updateData }) => updateStudentBatch(batchId, updateData),
         onSuccess:() => {
            queryClient.invalidateQueries({queryKey:["studentBatches"]})
         }
    })
}
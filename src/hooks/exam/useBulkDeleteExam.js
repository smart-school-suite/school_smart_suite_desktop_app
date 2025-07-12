import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkDeleteExam } from "../../services/exam";

export const useBulkDeleteExam = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:bulkDeleteExam,
         onSuccess: () => {
            queryClient.invalidateQueries({queryKey:["exams"]})
         }
    })
}
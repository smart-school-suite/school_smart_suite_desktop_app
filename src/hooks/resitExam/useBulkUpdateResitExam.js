import { bulkUpdateResitExam } from "../../services/resitExam";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useBulkUpdateResitExam = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:bulkUpdateResitExam,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["resitExams"] })
         }
    })
}
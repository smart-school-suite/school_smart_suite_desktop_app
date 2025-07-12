import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkUpdateExam } from "../../services/exam";

export const useBulkUpdateExam = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:bulkUpdateExam,
        onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["exams"]})
        }
    })
}
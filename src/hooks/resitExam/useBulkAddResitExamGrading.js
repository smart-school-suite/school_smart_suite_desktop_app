import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkAddResitExamGradingConfigs } from "../../services/resitExam";

export const useBulkAddResitExamGrading = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:bulkAddResitExamGradingConfigs,
        onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["resitExams"] })
        }
    })
}
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkAddExamGradingConfigs } from "../../services/exam";

export const useBulkAddExamGradingConfigs = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:bulkAddExamGradingConfigs,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["exams"]})
         }
    })
}
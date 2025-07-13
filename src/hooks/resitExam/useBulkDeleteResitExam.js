import { bulkDeleteResitExam } from "../../services/resitExam";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useBulkDeleteResitExam = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:bulkDeleteResitExam,
        onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["resitExams"] })
        }
    })
}
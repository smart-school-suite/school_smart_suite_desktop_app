import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateResitExam } from "../../services/resitExam";

export const useUpdateResitExam = () => {
    const queryClient = useQueryClient();
    return useMutation({ 
        mutationFn:({ resitExamId, updateData }) => updateResitExam(resitExamId, updateData),
        onSuccess:(resitExamId) => {
            queryClient.invalidateQueries({ queryKey:["resitExam", resitExamId] })
        }
    })
}
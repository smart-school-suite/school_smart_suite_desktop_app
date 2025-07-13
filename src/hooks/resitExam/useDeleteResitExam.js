import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteResitExam } from "../../services/resitExam";

export const useDeleteResitExam = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:deleteResitExam,
         onSuccess:(resitExamId) => {
            queryClient.invalidateQueries({ queryKey:["resitExam", resitExamId] })
         }
    })
}
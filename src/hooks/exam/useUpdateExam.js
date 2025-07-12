import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateExam } from "../../services/exam";

export const useUpdateExam = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:({ examId, updateData }) => updateExam(examId, updateData),
         onSuccess:(examId) => {
             queryClient.invalidateQueries({ queryKey:["exams"] })
             queryClient.removeQueries({ queryKey:["exam", examId] })
         }
    })
}
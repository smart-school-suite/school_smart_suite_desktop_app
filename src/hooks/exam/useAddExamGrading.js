import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addExamGrading } from "../../services/exam";

export const useAddExamGrading = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:(examId, gradesConfigId) => addExamGrading(examId, gradesConfigId),
         onSuccess:(examId) => {
             queryClient.invalidateQueries({ queryKey:["exams"] })
             queryClient.removeQueries({ queryKey:["exam", examId]})
         }
    })
}
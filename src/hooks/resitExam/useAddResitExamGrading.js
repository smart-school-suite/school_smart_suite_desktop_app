import { addResitExamGrading } from "../../services/resitExam";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddResitExamGrading = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:(resitExamId, gradesConfigId) => addResitExamGrading(resitExamId, gradesConfigId),
         onSuccess:(resitExamId) => {
            queryClient.invalidateQueries({ queryKey:["resitExam", resitExamId] })
         }
    })
}
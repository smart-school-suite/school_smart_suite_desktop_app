import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createExam } from "../../services/exam";

export const useCreateExam = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:createExam,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["exams"]})
            queryClient.invalidateQueries({ queryKey:["examCandidates"] })
         }
    })
}
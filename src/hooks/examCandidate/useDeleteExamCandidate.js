import { deleteExamCandidates } from "../../services/examCandidate";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteExamCandidate = () => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn:deleteExamCandidates,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["examCandidates"] })
         }
     })
}
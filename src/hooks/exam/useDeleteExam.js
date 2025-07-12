import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteExam } from "../../services/exam";

export const useDeleteExam = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:deleteExam,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["exams"]})
         }
    })
}
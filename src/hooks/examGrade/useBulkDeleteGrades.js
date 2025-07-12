import { bulkDeleteGrades } from "../../services/examGrade";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useBulkDeleteGrades = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:bulkDeleteGrades,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["examGrades"] })
         }
    })
}
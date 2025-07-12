import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteGrades } from "../../services/examGrade";

export const useDeleteGrades = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:deleteGrades,
        onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["exams"] })
        }
    })
}
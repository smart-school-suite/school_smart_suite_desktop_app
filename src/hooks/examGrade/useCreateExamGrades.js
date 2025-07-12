import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createExamGrades } from "../../services/examGrade";

export const useCreateExamGrades = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:createExamGrades,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["examGrades"] })
            queryClient.invalidateQueries({ queryKey:["schoolGradesConfig"] })
         }
    })
}
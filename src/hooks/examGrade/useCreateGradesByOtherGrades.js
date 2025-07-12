import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGradesByOtherGrades } from "../../services/examGrade";

export const useCreateGradesByOtherGrades = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:createGradesByOtherGrades,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["schoolGradesConfig"]})
         }
    })
    
}
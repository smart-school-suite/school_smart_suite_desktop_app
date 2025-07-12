import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateGrades } from "../../services/examGrade";

export const useUpdateGrades = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:({ gradeId, updateData }) => updateGrades(gradeId, updateData),
         onSuccess: () => {
            queryClient.invalidateQueries({queryKey:["exams"]})
         }
    })
}
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTeacherSpecialtyPreference } from "../../services/teacher";

export const useAddTeacherSpecialtyPreference = () => {
     const queryClient = useQueryClient();
     return useMutation({
        mutationFn:addTeacherSpecialtyPreference,
        onSuccess:(teacherId) => {
            queryClient.invalidateQueries({ queryKey:["teachers"] })
            queryClient.removeQueries({ queryKey:["teacher", teacherId] });
        }
     })
}
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTeacher } from "../../services/teacher";

export const useUpdateTeacher = () => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn:({ teacherId, updateData}) => updateTeacher(teacherId, updateData),
         onSuccess: (deletedTeacherId) => {
             queryClient.invalidateQueries({ queryKey:["teachers"] })
             queryClient.removeQueries({ queryKey: ['teacher', deletedTeacherId] })
         }
     })
}
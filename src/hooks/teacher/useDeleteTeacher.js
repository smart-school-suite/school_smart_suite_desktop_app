import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTeacher } from "../../services/teacher";

export const useDeleteTeacher = () => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn:deleteTeacher,
         onSuccess: (deletedTeacherId) => {
             queryClient.invalidateQueries({ queryKey:["teachers"] })
             queryClient.removeQueries({ queryKey: ['teacher', deletedTeacherId] })
         }
     })
}
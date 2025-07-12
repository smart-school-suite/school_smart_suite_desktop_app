import { useMutation, useQueryClient } from "@tanstack/react-query";
import { activateTeacher } from "../../services/teacher";

export const useActivateTeacher = () => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn:(teacherId) => activateTeacher(teacherId),
         onSuccess:(activatedTeacherId) => {
             queryClient.invalidateQueries({ queryKey:["teachers"] })
             queryClient.removeQueries({ queryKey: ['teacher', activatedTeacherId] })
         }
     })
}
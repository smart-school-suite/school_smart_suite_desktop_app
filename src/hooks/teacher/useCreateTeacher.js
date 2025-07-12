import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTeacher } from "../../services/teacher";

export const useCreateTeacher = () => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn:createTeacher,
         onSuccess:() => {
             queryClient.invalidateQueries({ queryKey:["teachers"]})
         }
     })
}
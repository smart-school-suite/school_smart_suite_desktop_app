import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteResit } from "../../services/studentResit";

export const useDeleteStudentResit = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:deleteResit,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["studentResits"] })
         }
    })
}
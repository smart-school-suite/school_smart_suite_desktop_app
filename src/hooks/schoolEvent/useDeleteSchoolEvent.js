import { deleteSchoolEvent } from "../../services/schoolEvent";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteSchoolEvent = () => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn:deleteSchoolEvent,
         onSuccess:() => {
             queryClient.invalidateQueries({ queryKey:["schoolEvents"] })
         }
     })
}
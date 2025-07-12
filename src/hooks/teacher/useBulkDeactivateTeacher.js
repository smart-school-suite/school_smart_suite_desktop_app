import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkDeactivateTeacher } from "../../services/teacher";

export const useBulkDeactivateTeacher = () => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn:bulkDeactivateTeacher,
         onSuccess:() => {
              queryClient.invalidateQueries({ queryKey:["teachers"] })
         }
     })
}
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkUpdateTeacher } from "../../services/teacher";

export const useBulkUpdateTeacher = () => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn:bulkUpdateTeacher,
         onSuccess:() => {
              queryClient.invalidateQueries({ queryKey:["teachers"] })
         }
     })
}
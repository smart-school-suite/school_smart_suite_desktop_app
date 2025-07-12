import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkDeleteTeacher } from "../../services/teacher";

export const useBulkDeleteTeacher = () => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn:bulkDeleteTeacher,
         onSuccess:() => {
              queryClient.invalidateQueries({ queryKey:["teachers"] })
         }
     })
}
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkActivateTeacher } from "../../services/teacher";

export const useBulkActivateTeacher = () => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn:bulkActivateTeacher,
         onSuccess: () => {
              queryClient.invalidateQueries({ queryKey:["teachers"]})
         }
     })
}
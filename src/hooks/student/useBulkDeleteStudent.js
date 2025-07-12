import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkDeleteStudent } from "../../services/Student";

export const useBulkDeleteStudent = () => {
     const queryClient = useQueryClient();
     return useMutation({
          mutationFn:bulkDeleteStudent,
             onSuccess: () => {
            queryClient.invalidateQueries({ queryKey:['students'] })
         }
     });
}
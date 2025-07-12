import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkActivateStudent } from "../../services/Student";

export const useBulkActivateStudent = () => {
     const queryClient = useQueryClient();
          return useMutation({
               mutationFn:bulkActivateStudent,
               onSuccess: () => {
               queryClient.invalidateQueries({ queryKey:['students'] })
         }
    });
}
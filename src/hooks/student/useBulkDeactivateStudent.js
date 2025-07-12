import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkDeactivateStudent } from "../../services/Student";

export const useBulkDeactivateStudent = () => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn: bulkDeactivateStudent,
         onSuccess: () => {
               queryClient.invalidateQueries({ queryKey:['students'] })
         }
     })
}
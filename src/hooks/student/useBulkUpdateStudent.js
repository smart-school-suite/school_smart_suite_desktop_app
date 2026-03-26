import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkUpdateStudent } from "../../services/student";

export const useBulkUpdateStudent = () => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn:({ updateData }) => bulkUpdateStudent(updateData),
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['students'] });
        },
     });

}
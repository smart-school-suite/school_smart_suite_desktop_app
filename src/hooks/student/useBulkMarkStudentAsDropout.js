import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkMarkStudentAsDropout } from "../../services/Student";

export const useBulkMarkStudentAsDropout = () => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn:bulkMarkStudentAsDropout,
          onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['students'] });
          queryClient.invalidateQueries({ queryKey: ['studentDropout']});
        }
     })
}
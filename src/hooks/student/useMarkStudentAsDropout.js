import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markStudentAsDropout } from "../../services/Student";
export const useMarkStudentAsDropout = () => {
     const queryClient = useQueryClient();
     return useMutation({
        mutationFn: (studentId) => markStudentAsDropout(studentId),
        onSuccess: (data, studentId) => {
        queryClient.invalidateQueries({ queryKey: ['students'] });
        queryClient.invalidateQueries({ queryKey: ['studentDropout']});
        queryClient.invalidateQueries({ queryKey: ['students', studentId] });
      },
     });
}
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deactivateStudent } from "../../services/Student";
export const useDeactivateStudent = () => {
     const queryClient = useQueryClient();
     return useMutation({
        mutationFn: (studentId) => deactivateStudent(studentId),
        onSuccess: (data, deactivatedStudentId) => {
        queryClient.invalidateQueries({ queryKey: ['students'] });
        queryClient.invalidateQueries({ queryKey: ['students', deactivatedStudentId] });
      },
   });
}
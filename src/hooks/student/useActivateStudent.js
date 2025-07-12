import { useMutation, useQueryClient } from "@tanstack/react-query";
import { activateStudent } from "../../services/Student";
export const useActivateStudent = () => {
     const queryClient = useQueryClient();
     return useMutation({
        mutationFn: (studentId) => activateStudent(studentId),
                onSuccess: (data, activatedStudentId) => {
                queryClient.invalidateQueries({ queryKey: ['students'] });
                queryClient.invalidateQueries({ queryKey: ['students', activatedStudentId] });
       },
     });
}
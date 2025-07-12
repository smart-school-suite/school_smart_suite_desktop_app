import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reinstateDropOutStudent } from "../../services/Student";

export const useReinstateDropOutStudent = () => {
     const queryClient = useQueryClient();
     return useMutation({
        mutationFn: (studentId) => reinstateDropOutStudent(studentId),
                onSuccess: (data, studentId) => {
                queryClient.invalidateQueries({ queryKey: ['students'] });
                queryClient.invalidateQueries({ queryKey: ['studentDropout']});
                queryClient.invalidateQueries({ queryKey: ['students', studentId] });
       },
     })
}
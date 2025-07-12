import { deleteStudent } from "../../services/Student";
import { useMutation, useQueryClient } from '@tanstack/react-query';
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
     mutationFn: deleteStudent,
     onSuccess: (data, deletedStudentId) => {
        queryClient.invalidateQueries({ queryKey: ['students'] })
        queryClient.removeQueries({ queryKey: ['students', deletedStudentId] })
     }
  })
};
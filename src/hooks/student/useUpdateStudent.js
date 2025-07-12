import { useQuery, useQueryClient } from '@tanstack/react-query';
import { updateStudent } from '../../services/Student';

export const useUpdateStudent = () => {
     const queryClient = useQueryClient();
     return useQuery({
        mutationFn: ({ id, updatedData }) => updateStudent(id, updatedData),
        onSuccess: (updatedStudent) => {
        queryClient.invalidateQueries({ queryKey: ['students'] });
        queryClient.invalidateQueries({ queryKey: ['students', updatedStudent.id] });
    },
  });
}
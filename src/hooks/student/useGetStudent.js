import { useQuery } from '@tanstack/react-query';
import { getAllStudents } from '../../services/student';

export const useGetStudents = () => {
  return useQuery({
    queryKey: ['students'],
    queryFn: () => getAllStudents(),
  });
};
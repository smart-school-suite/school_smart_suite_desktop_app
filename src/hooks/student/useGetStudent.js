import { useQuery } from '@tanstack/react-query';
import { getAllStudents } from '../../services/Student';

export const useGetStudents = () => {
  return useQuery({
    queryKey: ['students'],
    queryFn: getAllStudents,
  });
};
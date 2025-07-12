import { useQuery } from '@tanstack/react-query';
import { getDropoutStudents } from '../../services/Student';

export const useGetDropdoutStudents = () => {
    return useQuery({
        queryKey: ['studentDropout'],
        queryFn: getDropoutStudents,
    })
}
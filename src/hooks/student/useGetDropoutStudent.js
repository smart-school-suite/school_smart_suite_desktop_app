import { useQuery } from '@tanstack/react-query';
import { getDropoutStudents } from '../../services/student';

export const useGetDropdoutStudents = () => {
    return useQuery({
        queryKey: ['studentDropout'],
        queryFn: () => getDropoutStudents(),
    })
}
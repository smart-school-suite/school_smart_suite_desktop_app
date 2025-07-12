import { useQuery } from '@tanstack/react-query';
import { getCountries } from '../../services/country';

export const useGetCountries = () => {
  return useQuery({
    queryKey: ['countries'],
    queryFn: getCountries,
  });
};
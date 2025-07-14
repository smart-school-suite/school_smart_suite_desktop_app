import { getSchoolFinancialStats } from "../../services/financialStat";
import { useQuery } from "@tanstack/react-query";

export const useGetSchoolFinancialStats = (year) => {
  return useQuery({
    queryKey: ["schoolFinancialStats", year],
    queryFn: () => getSchoolFinancialStats(year),
    enabled: !!year,
    refetchInterval: 5000 * 60,
    staleTime: 5000,
  });
};

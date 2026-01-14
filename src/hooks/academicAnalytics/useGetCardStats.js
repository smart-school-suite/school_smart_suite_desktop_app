import { useQuery } from "@tanstack/react-query";
import { getCardStats } from "../../services/academicAnalytics";

export const useGetCardStats = (year) => {
  return useQuery({
    queryKey: ["academicCardStats", year],
    queryFn: () => getCardStats(year),
  });
};

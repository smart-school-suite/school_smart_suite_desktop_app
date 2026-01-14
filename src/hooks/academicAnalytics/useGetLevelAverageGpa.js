import { useQuery } from "@tanstack/react-query";
import { getLevelAverageGpa } from "../../services/academicAnalytics";

export const useGetLevelAverageGpa = (year) => {
  return useQuery({
    queryKey: ["levelAverageGpa", year],
    queryFn: () => getLevelAverageGpa(year),
  });
};

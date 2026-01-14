import { useQuery } from "@tanstack/react-query";
import { getLevelPassRate } from "../../services/academicAnalytics";

export const useGetLevelPassRate = (year) => {
  return useQuery({
    queryKey: ["levelPassRate", year],
    queryFn: () => getLevelPassRate(year),
  });
};

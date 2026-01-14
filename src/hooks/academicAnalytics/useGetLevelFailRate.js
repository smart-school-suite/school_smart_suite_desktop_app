import { getLevelFailRate } from "../../services/academicAnalytics";
import { useQuery } from "@tanstack/react-query";

export const useGetLevelFailRate = (year) => {
  return useQuery({
    queryKey: ["levelFailRate", year],
    queryFn: () => getLevelFailRate(year),
  });
};

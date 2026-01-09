import { useQuery } from "@tanstack/react-query";
import { getStudentLevelRetentionRate } from "../../services/operationalAnalytics";

export const useGetStudentLevelRetentionRate = (year) => {
  return useQuery({
    queryKey: ["studentLevelRetentionRate", year],
    queryFn: () => getStudentLevelRetentionRate(year),
  });
};

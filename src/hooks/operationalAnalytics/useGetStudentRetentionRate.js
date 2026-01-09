import { getStudentRetentionRate } from "../../services/operationalAnalytics";
import { useQuery } from "@tanstack/react-query";

export const useGetStudentRetentionRate = (year) => {
  return useQuery({
    queryKey: ["studentRetentionRate", year],
    queryFn: () => getStudentRetentionRate(year),
  });
};

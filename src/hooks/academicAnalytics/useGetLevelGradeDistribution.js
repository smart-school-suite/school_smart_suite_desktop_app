import { getLevelGradeDistribution } from "../../services/academicAnalytics";
import { useQuery } from "@tanstack/react-query";

export const useGetLevelGradeDistribution = (year) => {
  return useQuery({
    queryKey: ["levelGradeDistribution", year],
    queryFn: () => getLevelGradeDistribution(year),
  });
};

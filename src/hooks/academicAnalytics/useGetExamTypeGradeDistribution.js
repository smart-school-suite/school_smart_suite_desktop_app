import { useQuery } from "@tanstack/react-query";
import { getExamTypeGradeDistribution } from "../../services/academicAnalytics";

export const useGetExamTypeGradeDistribution = (year) => {
  return useQuery({
    queryKey: ["examTypeGradeDistribution", year],
    queryFn: () => getExamTypeGradeDistribution(year),
  });
};

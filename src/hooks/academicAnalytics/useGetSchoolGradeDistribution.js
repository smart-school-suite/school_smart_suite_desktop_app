import { getSchoolGradeDistribution } from "../../services/academicAnalytics";
import { useQuery } from "@tanstack/react-query";

export const useGetSchoolGradeDistribution = (year) => {
  return useQuery({
    queryKey: ["schoolGradeDistribution", year],
    queryFn: () => getSchoolGradeDistribution(year),
  });
};

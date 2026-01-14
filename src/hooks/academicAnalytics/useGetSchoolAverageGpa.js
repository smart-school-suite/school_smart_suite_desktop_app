import { getSchoolAverageGpa } from "../../services/academicAnalytics";
import { useQuery } from "@tanstack/react-query";

export const useGetSchoolAverageGpa = (year) => {
  return useQuery({
    queryKey: ["schoolAverageGpa", year],
    queryFn: () => getSchoolAverageGpa(year),
  });
};

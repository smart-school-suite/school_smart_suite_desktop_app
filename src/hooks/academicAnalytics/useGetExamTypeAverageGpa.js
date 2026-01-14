import { useQuery } from "@tanstack/react-query";
import { getExamTypeAverageGpa } from "../../services/academicAnalytics";

export const useGetExamTypeAverageGpa = (year) => {
  return useQuery({
    queryKey: ["examTypeAverageGpa", year],
    queryFn: () => getExamTypeAverageGpa(year),
  });
};

import { getExamTypePassRate } from "../../services/academicAnalytics";
import { useQuery } from "@tanstack/react-query";

export const useGetExamTypePassRate = (year) => {
  return useQuery({
    queryKey: ["examTypePassRate", year],
    queryFn: () => getExamTypePassRate(year),
  });
};

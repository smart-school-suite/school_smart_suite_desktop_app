import { useQuery } from "@tanstack/react-query";
import { getExamTypeFailRate } from "../../services/academicAnalytics";

export const useGetExamTypeFailRate = (year) => {
  return useQuery({
    queryKey: ["examTypeFailRate", year],
    queryFn: () => getExamTypeFailRate(year),
  });
};

import { useQuery } from "@tanstack/react-query";
import { getExamTypeResitTotal } from "../../services/academicAnalytics";

export const useGetExamTypeResitTotal = (year) => {
  return useQuery({
    queryKey: ["examTypeResitTotal", year],
    queryFn: () => getExamTypeResitTotal(year),
  });
};

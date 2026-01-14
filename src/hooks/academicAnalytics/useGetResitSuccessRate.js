import { getResitSuccessRate } from "../../services/academicAnalytics";
import { useQuery } from "@tanstack/react-query";

export const useGetResitSuccessRate = (year) => {
  return useQuery({
    queryKey: ["resitSuccessRate", year],
    queryFn: () => getResitSuccessRate(year),
  });
};

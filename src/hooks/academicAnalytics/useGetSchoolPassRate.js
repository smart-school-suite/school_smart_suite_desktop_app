import { useQuery } from "@tanstack/react-query";
import { getSchoolPassRate } from "../../services/academicAnalytics";

export const useGetSchoolPassRate = (year) => {
  return useQuery({
    queryKey: ["schoolPassRate", year],
    queryFn: () => getSchoolPassRate(year),
  });
};

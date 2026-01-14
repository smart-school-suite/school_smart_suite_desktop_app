import { getSchoolResitTotal } from "../../services/academicAnalytics";
import { useQuery } from "@tanstack/react-query";

export const useGetSchoolResitTotal = (year) => {
  return useQuery({
    queryKey: ["schoolResitTotal", year],
    queryFn: () => getSchoolResitTotal(year),
  });
};

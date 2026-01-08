import { useQuery } from "@tanstack/react-query";
import { getSchoolRevenue } from "../../services/financialAnalytics";

export const useGetSchoolRevenue = (year) => {
  return useQuery({
    queryKey: ["schoolRevenue", 2025],
    queryFn: () => getSchoolRevenue(year),
  });
};

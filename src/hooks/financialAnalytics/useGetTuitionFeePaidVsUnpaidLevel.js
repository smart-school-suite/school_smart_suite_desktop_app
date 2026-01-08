import { useQuery } from "@tanstack/react-query";
import { getTuitionFeePaidVsUnpaidLevel } from "../../services/financialAnalytics";

export const useGetTuitionFeePaidVsUnpaidLevel = (year) => {
  return useQuery({
    queryKey: ["tuitionFeePaidVsUnpaidLevel", year],
    queryFn: () => getTuitionFeePaidVsUnpaidLevel(year),
  });
};

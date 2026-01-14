import { useQuery } from "@tanstack/react-query";
import { getLevelResitTotal } from "../../services/academicAnalytics";

export const useGetLevelResitTotal = (year) => {
  return useQuery({
    queryKey: ["levelResitTotal", year],
    queryFn: () => getLevelResitTotal(year),
  });
};

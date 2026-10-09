import { getAudienceSummary } from "../../services/audience";
import { useQuery } from "@tanstack/react-query";

export const useGetAudienceSummary = () => {
  return useQuery({
    queryKey: ["audience-summary"],
    queryFn: () => getAudienceSummary(),
  });
};

import { useQuery } from "@tanstack/react-query";
import { getPromotionRunDetails } from "../../services/promotion";

const IN_PROGRESS = ["scheduled", "evaluating", "processing"];

export const useGetPromotionRunDetails = (runId) => {
  return useQuery({
    queryKey: ["promotion-run", runId],
    queryFn: () => getPromotionRunDetails(runId),
    enabled: Boolean(runId),
    // Counts move while the run is going; stop polling once it settles.
    refetchInterval: (query) =>
      IN_PROGRESS.includes(query.state.data?.data?.status) ? 5000 : false,
  });
};

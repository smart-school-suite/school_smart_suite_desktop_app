import { useQuery } from "@tanstack/react-query";
import { getPromotionRunDetails } from "../../services/promotion";

export const useGetPromotionRunDetails = (runId) => {
  return useQuery({
    queryKey: ["promotion-run", runId],
    queryFn: () => getPromotionRunDetails(runId),
  });
};

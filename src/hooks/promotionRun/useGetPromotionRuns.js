import { useQuery } from "@tanstack/react-query";
import { getPromotionRuns } from "../../services/promotion";

export const useGetPromotionRuns = () => {
  return useQuery({
    queryKey: ["promotion-runs"],
    queryFn: () => getPromotionRuns(),
  });
};

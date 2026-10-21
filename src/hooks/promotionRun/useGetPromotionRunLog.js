import { useQuery } from "@tanstack/react-query";
import { getPromotionRunLog } from "../../services/promotion";

export const useGetPromotionRunLog = (runId) => {
  return useQuery({
    queryKey: ["promotion-run-log", runId],
    queryFn: () => getPromotionRunLog(runId),
  });
};

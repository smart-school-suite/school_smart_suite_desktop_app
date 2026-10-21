import { useQuery } from "@tanstack/react-query";
import { getPromotionRecordLogs } from "../../services/promotionRecord";

export const useGetPromotionRecordLogs = (recordId) => {
  return useQuery({
    queryKey: ["promotion-record-log", recordId],
    queryFn: () => getPromotionRecordLogs(recordId),
  });
};

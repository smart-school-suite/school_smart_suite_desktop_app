import { useQuery } from "@tanstack/react-query";
import { getPromotionRecordLogs } from "../../services/promotionRecord";
import { retryUnlessEmpty } from "../../utils/teacher/teacherFilters";

export const useGetPromotionRecordLogs = (recordId) => {
  return useQuery({
    queryKey: ["promotion-record-log", recordId],
    queryFn: () => getPromotionRecordLogs(recordId),
    enabled: Boolean(recordId),
    // A 404 means the student has not been evaluated yet; don't retry it.
    retry: retryUnlessEmpty,
  });
};

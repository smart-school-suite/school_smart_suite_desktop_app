import { useQuery } from "@tanstack/react-query";
import { getRecordDetails } from "../../services/promotionRecord";

export const useGetRecordDetails = (recordId) => {
  return useQuery({
    queryKey: ["promotion-record-details", recordId],
    queryFn: () => getRecordDetails(recordId),
  });
};

import { useQuery } from "@tanstack/react-query";
import { getGraduationBatchDetails } from "../../services/graduationBatch";

export const useGetGraduationBatchDetails = (batchId) => {
  return useQuery({
    queryKey: ["graduation-batch", batchId],
    queryFn: () => getGraduationBatchDetails(batchId),
  });
};

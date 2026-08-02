import { useQuery } from "@tanstack/react-query";
import { getJobDetails } from "../../services/job";

export const useGetJobDetails = (jobId) => {
  return useQuery({
    queryKey: ["job", jobId],
    queryFn: () => getJobDetails(jobId),
    enabled: !!jobId,
  });
};

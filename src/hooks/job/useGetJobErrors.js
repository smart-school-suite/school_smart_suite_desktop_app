import { getJobErrors } from "../../services/job";
import { useQuery } from "@tanstack/react-query";

/** The issues of a job, grouped by reason (see JobError). */
export const useGetJobErrors = (jobId) => {
  return useQuery({
    queryKey: ["job-errors", jobId],
    queryFn: () => getJobErrors(jobId),
    enabled: Boolean(jobId),
  });
};

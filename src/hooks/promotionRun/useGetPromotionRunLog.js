import { useQuery } from "@tanstack/react-query";
import { getPromotionRunLog } from "../../services/promotion";
import { retryUnlessEmpty } from "../../utils/teacher/teacherFilters";

const IN_PROGRESS = ["scheduled", "evaluating", "processing"];

/**
 * The run's log ({ status, summary, counts, issues, students, run_status }).
 * A 404 means the run has not run yet and is not retried. While the run is
 * still going, the log is refreshed every few seconds.
 */
export const useGetPromotionRunLog = (runId, options = {}) => {
  return useQuery({
    queryKey: ["promotion-run-log", runId],
    queryFn: () => getPromotionRunLog(runId),
    enabled: Boolean(runId),
    retry: retryUnlessEmpty,
    refetchInterval: (query) => (IN_PROGRESS.includes(query.state.data?.data?.run_status) ? 5000 : false),
    ...options,
  });
};

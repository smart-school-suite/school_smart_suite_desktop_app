import { useQuery } from "@tanstack/react-query";
import { getResitUpdateEvaluationHelperData } from "../../services/resitEvaluation";
import { EVALUATION_HELPER_QUERY } from "../../utils/evaluation/scoreEntry";

export const useGetResitUpdateEvaluationHelper = (candidateId, options = {}) => {
  return useQuery({
    queryKey: ["resit-evaluation-update-helper-data", candidateId],
    queryFn: () => getResitUpdateEvaluationHelperData(candidateId),
    enabled: !!candidateId,
    ...EVALUATION_HELPER_QUERY,
    ...options,
  });
};

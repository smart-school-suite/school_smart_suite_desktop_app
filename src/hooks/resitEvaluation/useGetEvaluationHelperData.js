import { useQuery } from "@tanstack/react-query";
import { getResitEvaluationHelperData } from "../../services/resitEvaluation";
import { EVALUATION_HELPER_QUERY } from "../../utils/evaluation/scoreEntry";

export const useGetResitEvaluationHelperData = (candidateId, options = {}) => {
  return useQuery({
    queryKey: ["resit-evaluation-helper", candidateId],
    queryFn: () => getResitEvaluationHelperData(candidateId),
    enabled: !!candidateId,
    ...EVALUATION_HELPER_QUERY,
    ...options,
  });
};

import { getExamEvaluationHelperData } from "../../services/evaluationHelper";
import { useQuery } from "@tanstack/react-query";
import { EVALUATION_HELPER_QUERY } from "../../utils/evaluation/scoreEntry";

export const useGetExamEvaluationHelperData = (candidateId, options = {}) => {
  return useQuery({
    queryKey: ["exam-evaluation-helper-data", candidateId],
    queryFn: () => getExamEvaluationHelperData(candidateId),
    enabled: !!candidateId,
    ...EVALUATION_HELPER_QUERY,
    ...options,
  });
};

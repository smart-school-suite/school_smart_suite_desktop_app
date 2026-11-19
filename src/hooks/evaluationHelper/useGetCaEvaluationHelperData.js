import { useQuery } from "@tanstack/react-query";
import { getCaEvaluationHelperData } from "../../services/evaluationHelper";
import { EVALUATION_HELPER_QUERY } from "../../utils/evaluation/scoreEntry";

export const useGetCaEvaluationHelperData = (candidateId, options = {}) => {
  return useQuery({
    queryKey: ["ca-evaluation-helper-data", candidateId],
    queryFn: () => getCaEvaluationHelperData(candidateId),
    enabled: !!candidateId,
    ...EVALUATION_HELPER_QUERY,
    ...options,
  });
};

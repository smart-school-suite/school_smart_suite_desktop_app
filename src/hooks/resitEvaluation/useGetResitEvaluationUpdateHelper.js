import { useQuery } from "@tanstack/react-query";
import { getResitUpdateEvaluationHelperData } from "../../services/resitEvaluation";

export const useGetResitUpdateEvaluationHelper = (candidateId) => {
  return useQuery({
    queryKey: ["resit-evaluation-update-helper-data", candidateId],
    queryFn: () => getResitUpdateEvaluationHelperData(candidateId),
    enabled: !!candidateId,
  });
};

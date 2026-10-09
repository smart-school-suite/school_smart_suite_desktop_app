import { useQuery } from "@tanstack/react-query";
import { getResitEvaluationHelperData } from "../../services/resitEvaluation";

export const useGetResitEvaluationHelperData = (candidateId) => {
  return useQuery({
    queryKey: ["resit-evaluation-helper", candidateId],
    queryFn: () => getResitEvaluationHelperData(candidateId),
  });
};

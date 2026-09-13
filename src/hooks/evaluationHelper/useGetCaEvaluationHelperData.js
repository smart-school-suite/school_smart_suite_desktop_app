import { useQuery } from "@tanstack/react-query";
import { getCaEvaluationHelperData } from "../../services/evaluationHelper";

export const useGetCaEvaluationHelperData = (candidateId) => {
  return useQuery({
    queryKey: ["ca-evaluation-helper-data", candidateId],
    queryFn: () => getCaEvaluationHelperData(candidateId),
    enabled: !!candidateId,
  });
};

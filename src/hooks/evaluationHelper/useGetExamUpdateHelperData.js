import { getExamUpdateHelperData } from "../../services/evaluationHelper";
import { useQuery } from "@tanstack/react-query";
import { EVALUATION_HELPER_QUERY } from "../../utils/evaluation/scoreEntry";

export const useGetExamUpdateHelperData = (candidateId, options = {}) => {
  return useQuery({
    queryKey: ["exam-update-helper", candidateId],
    queryFn: () => getExamUpdateHelperData(candidateId),
    enabled: !!candidateId,
    ...EVALUATION_HELPER_QUERY,
    ...options,
  });
};

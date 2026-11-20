import { useQuery } from "@tanstack/react-query";
import { getCaUpdateHelperData } from "../../services/evaluationHelper";
import { EVALUATION_HELPER_QUERY } from "../../utils/evaluation/scoreEntry";

export const useGetCaUpdateHelperData = (candidateId, options = {}) => {
  return useQuery({
    queryKey: ["ca-update-helper", candidateId],
    queryFn: () => getCaUpdateHelperData(candidateId),
    enabled: !!candidateId,
    ...EVALUATION_HELPER_QUERY,
    ...options,
  });
};

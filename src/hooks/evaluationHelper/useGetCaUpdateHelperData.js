import { useQuery } from "@tanstack/react-query";
import { getCaUpdateHelperData } from "../../services/evaluationHelper";

export const useGetCaUpdateHelperData = (candidateId) => {
  return useQuery({
    queryKey: ["ca-update-helper", candidateId],
    queryFn: () => getCaUpdateHelperData(candidateId),
    enabled: !!candidateId,
  });
};

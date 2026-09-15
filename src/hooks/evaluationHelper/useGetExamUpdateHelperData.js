import { getExamUpdateHelperData } from "../../services/evaluationHelper";
import { useQuery } from "@tanstack/react-query";

export const useGetExamUpdateHelperData = (candidateId) => {
     return useQuery({
         queryKey:["exam-update-helper", candidateId],
         queryFn: () => getExamUpdateHelperData(candidateId),
         enabled: !!candidateId
     })
}
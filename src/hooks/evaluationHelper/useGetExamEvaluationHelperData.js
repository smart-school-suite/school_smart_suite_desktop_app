import { getExamEvaluationHelperData } from "../../services/evaluationHelper";
import { useQuery } from "@tanstack/react-query";

export const useGetExamEvaluationHelperData = (candidateId) => {
     return useQuery({
         queryKey:["exam-evaluation-helper-data", candidateId],
         queryFn:() => getExamEvaluationHelperData(candidateId),
         enabled: !!candidateId
     })
}
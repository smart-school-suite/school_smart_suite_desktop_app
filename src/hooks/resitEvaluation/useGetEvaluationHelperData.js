import { useQuery } from "@tanstack/react-query";
import { getResitEvaluationHelperData } from "../../services/resitEvaluation";

export const useGetResitEvaluationHelperData = (resitExamId, candidateId) => {
    return useQuery({
         queryKey:["resitEvaluationHelperData", candidateId],
         queryFn:() => getResitEvaluationHelperData(resitExamId, candidateId)
    })
} 
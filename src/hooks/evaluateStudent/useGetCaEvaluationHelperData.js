import { useQuery } from "@tanstack/react-query";
import { getCaEvaluationHelperData } from "../../services/evaluateStudent";

export const useGetCaEvaluationHelperData = (examId) => {
     return useQuery({
         queryKey:["caEvaluationHelperData", examId],
         queryFn:() => getCaEvaluationHelperData(examId),
         enabled:!!examId
     })
}
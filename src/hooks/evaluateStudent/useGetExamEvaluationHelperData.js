import { useQuery } from "@tanstack/react-query";
import { getExamEvaluationHelperData } from "../../services/evaluateStudent";

export const useGetExamEvaluationHelperData = (examId, studentId) => {
     return useQuery({
         queryKey:["examEvalutionHelperData", examId, studentId],
         queryFn:() => getExamEvaluationHelperData(examId, studentId)
     })
}
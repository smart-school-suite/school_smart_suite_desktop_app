import { useQuery } from "@tanstack/react-query";
import { prepareResitData } from "../../services/resitEvaluation";

export const useGetResitEvaluationHelperData = (examId, studentId) => {
    return useQuery({
         queryKey:["resitEvaluationHelperData"],
         queryFn:prepareResitData(examId, studentId)
    })
} 
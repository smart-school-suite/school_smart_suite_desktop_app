import { useQuery } from "@tanstack/react-query";
import { prepareExamData } from "../../services/evaluateStudent";

export const useGetExamHelperData = (examId, studentId) => {
    return useQuery({
         queryKey:["examHelperData", examId],
         queryFn:prepareExamData(examId, studentId)
    })
}
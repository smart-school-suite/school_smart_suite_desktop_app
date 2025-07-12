import { useQuery } from "@tanstack/react-query";
import { associateWeightedMarkWithLetterGrades } from "../../services/exam";

export const useGetExamWeightedMarkGrades = (examId) => {
    return useQuery({
         queryKey:["examWeightedMarkLetterGrades"],
         queryFn:associateWeightedMarkWithLetterGrades(examId),
         enabled:!!examId
    })
}
import { useQuery } from "@tanstack/react-query";
import { getExamDetails } from "../../services/exam";

export const useGetExamDetails = (examId) => {
    return useQuery({
         queryKey:["exam", examId],
         queryFn:getExamDetails(examId),
         enabled:!!examId
    })
}
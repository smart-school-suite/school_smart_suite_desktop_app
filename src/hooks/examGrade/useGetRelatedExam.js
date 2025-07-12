import { useQuery } from "@tanstack/react-query";
import { getRelatedExams } from "../../services/examGrade";

export const useGetRelatedExams = (examId) => {
    return useQuery({
         queryKey:["relatedExams"],
         queryFn:getRelatedExams(examId)
    })
}
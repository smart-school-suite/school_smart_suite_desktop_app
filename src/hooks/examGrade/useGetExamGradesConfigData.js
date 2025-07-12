import { useQuery } from "@tanstack/react-query";
import { getExamConfigData } from "../../services/examGrade";

export const useGetExamConfigData = (examId) => {
     return useQuery({
         queryKey:["examGradeConfigData", examId],
         queryFn:getExamConfigData(examId)
     })
}
import { useQuery } from "@tanstack/react-query";
import { getGradesConfigByExam } from "../../services/examGrade";

export const useGetGradesConfigByExam = (examId) => {
    return useQuery({
         queryKey:["gradesConfig", examId],
         queryFn:getGradesConfigByExam(examId)
    })
}
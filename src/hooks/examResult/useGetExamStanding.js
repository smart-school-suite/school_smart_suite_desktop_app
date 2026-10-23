import { useQuery } from "@tanstack/react-query";
import { getExamStandings } from "../../services/examResults";

export const useGetExamStanding = (examId) => {
     return useQuery({
         queryKey:["exam-result-standing", examId],
         queryFn: () => getExamStandings(examId)
     })
}
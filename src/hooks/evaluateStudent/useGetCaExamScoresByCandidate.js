import { useQuery } from "@tanstack/react-query";
import { getCaExamScoresByCandidate } from "../../services/evaluateStudent";

export const useGetCaExamScoresByCandidate = (candidateId) => {
     return useQuery({
         queryKey:["caExamScores", candidateId],
         queryFn:() => getCaExamScoresByCandidate(candidateId)
     })
}
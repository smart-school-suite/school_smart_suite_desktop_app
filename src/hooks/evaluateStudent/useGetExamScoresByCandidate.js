import { useQuery } from "@tanstack/react-query";
import { getExamScoresByCandidate } from "../../services/evaluateStudent";

export const useGetExamScoreByCandidate = (candidateId) => {
     return useQuery({
         queryKey:["examScores", candidateId],
         queryFn:() => getExamScoresByCandidate(candidateId)
     })
}
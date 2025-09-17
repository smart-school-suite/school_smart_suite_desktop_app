import { useQuery } from "@tanstack/react-query";
import { getResitScoresByCandidate } from "../../services/resitEvaluation";
export const useGetResitScoresByCandidate = (candidateId) => {
    return useQuery({
         queryKey:["resitScores", candidateId],
         queryFn:() => getResitScoresByCandidate(candidateId)
    })
}
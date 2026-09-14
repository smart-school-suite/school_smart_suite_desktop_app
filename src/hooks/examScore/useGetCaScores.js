import { useQuery } from "@tanstack/react-query";
import { getCaScores } from "../../services/examScore";

export const useGetCaScores = (candidateId) => {
     return useQuery({
         queryKey:["candidate-scores", candidateId],
         queryFn: () => getCaScores(candidateId),
         enabled: !!candidateId
     })
}
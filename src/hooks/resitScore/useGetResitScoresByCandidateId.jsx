import { useQuery } from "@tanstack/react-query";
import { getResitExamScores } from "../../services/resitScore";
export const useGetResitScoresByCandidateId = (candidateId) => {
  return useQuery({
    queryFn: () => getResitExamScores(candidateId),
    queryKey: ["resit-scores", candidateId],
    enabled: !!candidateId,
  });
};

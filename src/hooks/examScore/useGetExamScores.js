import { useQuery } from "@tanstack/react-query";
import { getExamScores } from "../../services/examScore";

export const useGetExamScores = (candidateId) => {
  return useQuery({
    queryKey: ["exam-scores", candidateId],
    queryFn: () => getExamScores(candidateId),
    enabled: !!candidateId,
  });
};

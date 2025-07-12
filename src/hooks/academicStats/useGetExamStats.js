import { useQuery } from "@tanstack/react-query";
import { getExamStats } from "../../services/academicStats";

export const useGetExamStats = (examId) => {
  return useQuery({
    queryKey: ["examStats", examId],
    queryFn: () => getExamStats(examId),
    enabled: !!examId,
  });
};

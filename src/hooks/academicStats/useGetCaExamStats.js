import { useQuery } from "@tanstack/react-query";
import { getCaExamStats } from "../../services/academicStats";

export const useGetCaExamStats = (examId) => {
  return useQuery({
    queryKey: ["caExamStats", examId],
    queryFn: () => getCaExamStats(examId),
    enabled: !!examId,
  });
};

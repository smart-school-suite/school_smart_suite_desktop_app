import { useQuery } from "@tanstack/react-query";
import { getExamResultProgress } from "../../services/examResults";

export const useGetExamResultProgress = (examId) => {
  return useQuery({
    queryKey: ["exam-result-progress", examId],
    queryFn: () => getExamResultProgress(examId),
  });
};

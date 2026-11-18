import { useQuery } from "@tanstack/react-query";
import { getExamUpdateRules } from "../../services/exam";

export const useGetExamUpdateRules = (examId, options = {}) => {
  return useQuery({
    queryKey: ["exam-update-rules", examId],
    queryFn: () => getExamUpdateRules(examId),
    enabled: Boolean(examId),
    // Rules depend on today's date and on related records; always re-check.
    staleTime: 0,
    ...options,
  });
};

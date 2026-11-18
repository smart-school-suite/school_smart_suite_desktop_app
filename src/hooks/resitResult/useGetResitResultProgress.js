import { useQuery } from "@tanstack/react-query";
import { getResitResultProgress } from "../../services/resitResults";

export const useGetResitResultProgress = (resitExamId) => {
  return useQuery({
    queryKey: ["resit-result-progress", resitExamId],
    queryFn: () => getResitResultProgress(resitExamId),
    enabled: Boolean(resitExamId),
  });
};

import { useQuery } from "@tanstack/react-query";
import { getExamCreationOptions } from "../../services/exam";

export const useGetExamCreationOptions = (options = {}) => {
  return useQuery({
    queryKey: ["exam-creation-options"],
    queryFn: getExamCreationOptions,
    // Options depend on today's date and on the exams that exist; always re-check.
    staleTime: 0,
    refetchOnMount: "always",
    // Retry a connection or server error once; a 4xx answer is final.
    retry: (failureCount, error) => {
      const status = error?.response?.status;
      return !(status >= 400 && status < 500) && failureCount < 1;
    },
    ...options,
  });
};

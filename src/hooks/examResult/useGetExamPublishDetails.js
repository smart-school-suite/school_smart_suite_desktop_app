import { useQuery } from "@tanstack/react-query";
import { getExamPublishDetails } from "../../services/examResults";

export const useGetExamPublishDetails = (examId) => {
  return useQuery({
    queryKey: ["exam-publish-details", examId],
    queryFn: () => getExamPublishDetails(examId),
  });
};

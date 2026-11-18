import { useQuery } from "@tanstack/react-query";
import { getResitResultPublishDetails } from "../../services/resitResults";

export const useGetResitResultPublishDetails = (resitExamId) => {
  return useQuery({
    queryKey: ["resit-result-publish-details", resitExamId],
    queryFn: () => getResitResultPublishDetails(resitExamId),
    enabled: Boolean(resitExamId),
  });
};

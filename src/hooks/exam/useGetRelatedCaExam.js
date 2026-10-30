import { useQuery } from "@tanstack/react-query";
import { getRelatedCaExams } from "../../services/exam";

export const useGetRelatedCaExam = (
  schoolYearId,
  examTypeId,
  { enabled = true } = {},
) => {
  return useQuery({
    queryKey: [`related-ca-exam-${schoolYearId}`, examTypeId],
    queryFn: () => getRelatedCaExams(schoolYearId, examTypeId),
    enabled: enabled && !!schoolYearId && !!examTypeId,
  });
};

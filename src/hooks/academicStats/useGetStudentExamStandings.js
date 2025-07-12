import { useQuery } from "@tanstack/react-query";
import { getStudentExamStandings } from "../../services/academicStats";

export const useGetStudentExamStandings = (examId) => {
  return useQuery({
    queryKey: ["examStandings", examId],
    queryFn: () => getStudentExamStandings(examId),
    enabled: !!examId,
  });
};

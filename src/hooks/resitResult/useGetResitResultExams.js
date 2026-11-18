import { useQuery } from "@tanstack/react-query";
import { getResitResultExams } from "../../services/resitResults";

export const useGetResitResultExams = () => {
  return useQuery({
    queryKey: ["result-resit-exams"],
    queryFn: getResitResultExams,
  });
};

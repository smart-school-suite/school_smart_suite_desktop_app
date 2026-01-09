import { getTotalStudents } from "../../services/operationalAnalytics";
import { useQuery } from "@tanstack/react-query";

export const useGetStudentTotal = () => {
  return useQuery({
    queryKey: ["studentTotal"],
    queryFn: () => getTotalStudents(),
  });
};

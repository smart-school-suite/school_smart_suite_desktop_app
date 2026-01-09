import { getTeacherStudentRatioLevel } from "../../services/operationalAnalytics";
import { useQuery } from "@tanstack/react-query";

export const useGetTeacherStudentRatioLevel = () => {
  return useQuery({
    queryKey: ["teacherStudentRatio"],
    queryFn: () => getTeacherStudentRatioLevel(),
  });
};

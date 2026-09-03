import { useQuery } from "@tanstack/react-query";
import { getActiveGradeScaleCategories } from "../../services/gradeScale";

export const useGetActiveGradeScaleCategories = () => {
  return useQuery({
    queryKey: ["grade-scale-categories-active"],
    queryFn: () => getActiveGradeScaleCategories(),
  });
};

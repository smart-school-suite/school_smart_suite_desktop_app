import { useQuery } from "@tanstack/react-query";
import { getGradeScaleCategories } from "../../services/gradeScale";

export const useGetGradeScaleCategories = () => {
  return useQuery({
    queryKey: ["grade-scale-categories"],
    queryFn: () => getGradeScaleCategories(),
  });
};

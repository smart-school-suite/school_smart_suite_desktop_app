import { useQuery } from "@tanstack/react-query";
import { getGradeScaleCategoryId } from "../../services/gradeScale";

export const useGetGradeScaleCategoryId = (categoryId) => {
  return useQuery({
    queryKey: ["grade-scale/category", categoryId],
    queryFn: () => getGradeScaleCategoryId(categoryId),
  });
};

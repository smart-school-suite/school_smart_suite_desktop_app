import { useQuery } from "@tanstack/react-query";
import { getGradeScaleCategoryDetails } from "../../services/gradeScale";

export const useGetGradeScaleDetails = (categoryId) => {
  return useQuery({
    queryKey: ["grade-scale-category-details", categoryId],
    queryFn: () => getGradeScaleCategoryDetails(categoryId),
  });
};

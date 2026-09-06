import { useQuery } from "@tanstack/react-query";
import { getGradeScaleCategoryId } from "../../services/gradeScale";

export const useGetGradeScaleCategoryId = (
  categoryId,
  configType = null,
  maxScore = null,
) => {
  return useQuery({
    queryKey: ["grade-scale-category", categoryId],
    queryFn: () => getGradeScaleCategoryId(categoryId, configType, maxScore),
    enabled: !!categoryId
  });
};

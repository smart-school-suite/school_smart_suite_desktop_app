import { getCoursesSpecialtyId } from "../../services/course";
import { useQuery } from "@tanstack/react-query";

export const useGetCourseSpecialtyId = (specialtyId) => {
  return useQuery({
    queryKey: ["course-specialty", specialtyId],
    queryFn: () => getCoursesSpecialtyId(specialtyId),
    enabled: !!specialtyId,
  });
};

import { useQuery } from "@tanstack/react-query";
import { getJointCourseRecommendedWeek } from "../../services/jointCourseTimetable";

export const useGetJointCourseRecommendedWeek = (semesterJointCourseId, payload) => {
  return useQuery({
    queryKey: ["joint-course-recommended-week", semesterJointCourseId, payload],
    queryFn: () => getJointCourseRecommendedWeek(semesterJointCourseId, payload),
    enabled: Boolean(semesterJointCourseId && payload?.hall_id && payload?.duration_minutes && payload?.days?.length),
    staleTime: 0,
  });
};

import { useQuery } from "@tanstack/react-query";
import { getJointCourseHallAvailability } from "../../services/jointCourseTimetable";

export const useGetJointCourseHallAvailability = (semesterJointCourseId, payload) => {
  return useQuery({
    queryKey: ["joint-course-hall-availability", semesterJointCourseId, payload],
    queryFn: () => getJointCourseHallAvailability(semesterJointCourseId, payload),
    enabled: Boolean(semesterJointCourseId && payload?.duration_minutes && payload?.days?.length),
    staleTime: 0,
  });
};

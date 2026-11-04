import { useMutation } from "@tanstack/react-query";
import { getJointCourseRecommendedSlots } from "../../services/jointCourseTimetable";

export const useRecommendJointCourseSlots = () => {
  return useMutation({
    mutationFn: ({ semesterJointCourseId, payload }) =>
      getJointCourseRecommendedSlots(semesterJointCourseId, payload),
  });
};

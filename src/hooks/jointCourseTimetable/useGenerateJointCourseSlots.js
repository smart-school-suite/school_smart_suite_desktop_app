import { useMutation } from "@tanstack/react-query";
import { generateJointCourseSlots } from "../../services/jointCourseTimetable";

export const useGenerateJointCourseSlots = () => {
  return useMutation({
    mutationFn: ({ semesterJointCourseId, payload }) =>
      generateJointCourseSlots(semesterJointCourseId, payload),
  });
};

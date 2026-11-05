import { useQuery } from "@tanstack/react-query";
import { getJointCourseAssignment } from "../../services/jointCourse";

export const JOINT_COURSE_ASSIGNMENT_KEY = "joint-course-assignment";

export const useGetJointCourseAssignment = (jointCourseId) => {
  return useQuery({
    queryKey: [JOINT_COURSE_ASSIGNMENT_KEY, jointCourseId],
    queryFn: () => getJointCourseAssignment(jointCourseId),
    enabled: Boolean(jointCourseId),
  });
};

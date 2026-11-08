import { useQuery } from "@tanstack/react-query";
import { getJointCourseTerms } from "../../services/jointCourseTimetable";

export const JOINT_COURSE_TERMS_KEY = "joint-course-terms";

export const useGetJointCourseTerms = ({ enabled = true } = {}) => {
  return useQuery({
    queryKey: [JOINT_COURSE_TERMS_KEY],
    queryFn: () => getJointCourseTerms(),
    enabled,
  });
};

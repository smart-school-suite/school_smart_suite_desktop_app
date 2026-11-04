import { useQuery } from "@tanstack/react-query";
import { getJointCourseTerm } from "../../services/jointCourseTimetable";

export const JOINT_COURSE_TERM_KEY = "joint-course-term";

export const useGetJointCourseTerm = (term) => {
  return useQuery({
    queryKey: [JOINT_COURSE_TERM_KEY, term?.school_year_id, term?.semester_id],
    queryFn: () => getJointCourseTerm(term.school_year_id, term.semester_id),
    enabled: Boolean(term?.school_year_id && term?.semester_id),
  });
};

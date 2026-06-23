import { useQuery } from "@tanstack/react-query";
import { getJointCourseDetails } from "../../services/jointCourse";

export const useGetJointCourseDetails = (jointCourseId) => {
  return useQuery({
    queryKey: ["joint-course", jointCourseId],
    queryFn: () => getJointCourseDetails(jointCourseId),
    enabled: !jointCourseId,
  });
};

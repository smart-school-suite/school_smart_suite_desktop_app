import { getAssignedTeacherCourses } from "../../services/teacherCourse";
import { useQuery } from "@tanstack/react-query";

export const useGetAssignedTeacherCourses = (teacherId) => {
  return useQuery({
    queryKey: ["assignedTeacherCourses", teacherId],
    queryFn: () => getAssignedTeacherCourses(teacherId),
  });
};

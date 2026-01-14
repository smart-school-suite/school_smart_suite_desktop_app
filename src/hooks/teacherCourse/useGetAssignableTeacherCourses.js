import { useQuery } from "@tanstack/react-query";
import { getAssignableTeacherCourses } from "../../services/teacherCourse";

export const useGetAssignableTeacherCourses = (teacherId) => {
     return useQuery({
         queryKey:["assignableTeacherCourses", teacherId],
         queryFn:() => getAssignableTeacherCourses(teacherId)
     })
}
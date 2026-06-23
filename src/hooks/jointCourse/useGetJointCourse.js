import { getJointCourses } from "../../services/jointCourse";
import { useQuery } from "@tanstack/react-query";

export const useGetJointCourses = () => {
     return useQuery({
         queryKey:["joint-courses"],
         queryFn:() => getJointCourses()
     })
}
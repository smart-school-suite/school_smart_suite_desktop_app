import { getTeacherStudentRatio } from "../../services/operationalAnalytics";
import { useQuery } from "@tanstack/react-query";

export const useGetTeacherStudentRatio = () => {
     return useQuery({
         queryKey:["teacherStudentRatio"],
         queryFn:() => getTeacherStudentRatio()
     })
}
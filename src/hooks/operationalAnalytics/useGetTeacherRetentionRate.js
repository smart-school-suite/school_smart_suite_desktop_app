import { getTeacherRetentionRate } from "../../services/operationalAnalytics";
import { useQuery } from "@tanstack/react-query";

export const useGetTeacherRetentionRate = () => {
     return useQuery({
         queryKey:["teacherRetentionRate"],
         queryFn:() => getTeacherRetentionRate()
     })
}
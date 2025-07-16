import { getAvailableSpecialtyPreferences } from "../../services/teacher";
import { useQuery } from "@tanstack/react-query";

export const useGetAvialableSpecialtyPreference = (teacherId) => {
    return useQuery({
         queryKey:["availableTeacherSpecialtyPreference", teacherId],
         queryFn:() => getAvailableSpecialtyPreferences(teacherId)
    })
}
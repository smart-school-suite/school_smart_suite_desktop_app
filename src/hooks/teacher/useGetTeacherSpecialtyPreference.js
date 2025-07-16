import { useQuery } from "@tanstack/react-query";
import { getTeacherSpecialtyPreference } from "../../services/teacher";

export const useGetTeacherSpecialtyPreference = (teacherId) => {
      return useQuery({
            queryKey: ['teacherSpecialtyPreference', teacherId],
            queryFn: () => getTeacherSpecialtyPreference(teacherId),
            enabled: !!teacherId,
    });
}
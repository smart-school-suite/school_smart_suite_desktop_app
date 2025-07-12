import { useQuery } from "@tanstack/react-query";
import { getTeacherDetails } from "../../services/teacher";

export const useGetTeacherDetails = (teacherId) => {
     return useQuery({
              queryKey: ['teacher', teacherId],
              queryFn: () => getTeacherDetails(teacherId),
              enabled: !!teacherId,
    });
}
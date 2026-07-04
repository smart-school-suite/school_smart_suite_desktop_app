import { useQuery } from "@tanstack/react-query";
import { getTeacherAssignedSpecialties } from "../../services/teacherSpecialty";

export const useGetTeacherAssignedSpecialties = (teacherId) => {
  return useQuery({
    queryKey: ["teacher-assigned-specialties", teacherId],
    queryFn: () => getTeacherAssignedSpecialties(teacherId),
    enabled: !!teacherId,
  });
};

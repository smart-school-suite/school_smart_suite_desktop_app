import { useQuery } from "@tanstack/react-query";
import { getAssignableTeachers } from "../../services/teacherSpecialty";

export const useGetAssignableTeachers = (specialtyId) => {
  return useQuery({
    queryKey: ["specialty-assignable-teachers", specialtyId],
    queryFn: () => getAssignableTeachers(specialtyId),
    enabled: !!specialtyId,
  });
};

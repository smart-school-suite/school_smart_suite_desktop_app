import { useQuery } from "@tanstack/react-query";
import { getAssignableTeachers } from "../../services/teacherSpecialty";
import { retryUnlessEmpty } from "../../utils/teacher/teacherFilters";

export const useGetAssignableTeachers = (specialtyId) => {
  return useQuery({
    queryKey: ["specialty-assignable-teachers", specialtyId],
    queryFn: () => getAssignableTeachers(specialtyId),
    enabled: !!specialtyId,
    retry: retryUnlessEmpty,
  });
};

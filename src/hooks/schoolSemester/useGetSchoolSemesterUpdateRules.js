import { useQuery } from "@tanstack/react-query";
import { getSchoolSemesterUpdateRules } from "../../services/schoolSemester";

export const useGetSchoolSemesterUpdateRules = (schoolSemesterId, options = {}) => {
  return useQuery({
    queryKey: ["school-semester-update-rules", schoolSemesterId],
    queryFn: () => getSchoolSemesterUpdateRules(schoolSemesterId),
    enabled: Boolean(schoolSemesterId),
    // Rules depend on today's date and on related records; always re-check.
    staleTime: 0,
    ...options,
  });
};

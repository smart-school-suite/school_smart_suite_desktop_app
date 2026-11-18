import { useQuery } from "@tanstack/react-query";
import { getSchoolAcademicYearUpdateRules } from "../../services/academicYear";

export const useGetSchoolAcademicYearUpdateRules = (schoolAcademicYearId, options = {}) => {
  return useQuery({
    queryKey: ["school-academic-year-update-rules", schoolAcademicYearId],
    queryFn: () => getSchoolAcademicYearUpdateRules(schoolAcademicYearId),
    enabled: Boolean(schoolAcademicYearId),
    // Rules depend on today's date and on related records; always re-check.
    staleTime: 0,
    ...options,
  });
};

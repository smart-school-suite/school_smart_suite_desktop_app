import { useQuery } from "@tanstack/react-query";
import { getSchoolAcademicYearDetails } from "../../services/academicYear";

export const useGetSchoolAcademicYearDetails = (schoolAcademicYearId) => {
  return useQuery({
    queryKey: ["school-academic-year", schoolAcademicYearId],
    queryFn: () => getSchoolAcademicYearDetails(schoolAcademicYearId),
  });
};

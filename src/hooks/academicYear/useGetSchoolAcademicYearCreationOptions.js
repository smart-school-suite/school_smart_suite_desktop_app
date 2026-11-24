import { useQuery } from "@tanstack/react-query";
import { getSchoolAcademicYearCreationOptions } from "../../services/academicYear";

export const useGetSchoolAcademicYearCreationOptions = () => {
  return useQuery({
    queryKey: ["schoolAcademicYearCreationOptions"],
    queryFn: () => getSchoolAcademicYearCreationOptions(),
  });
};

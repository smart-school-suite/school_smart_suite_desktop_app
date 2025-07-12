import { useQuery } from "@tanstack/react-query";
import { getSchoolAcademicStats } from "../../services/academicStats";

export const useGetSchoolAcademicStats = (year) => {
  return useQuery({
    queryKey: ["schoolAcademicStats", year],
    queryFn: () => getSchoolAcademicStats(year),
    enabled: !!year,
  });
};

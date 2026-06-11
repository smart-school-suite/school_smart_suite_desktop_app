import { useQuery } from "@tanstack/react-query";
import { getAllSystemAcademicYear } from "../../services/academicYear";

export const useGetAllSystemAcademicYear = () => {
  return useQuery({
    queryKey: ["all-system-academic-years"],
    queryFn: () => getAllSystemAcademicYear(),
  });
};

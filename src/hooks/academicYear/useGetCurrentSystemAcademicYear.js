import { getCurrentSystemAcademicYear } from "../../services/academicYear";
import { useQuery } from "@tanstack/react-query";

export const useGetCurrentSystemAcademicYear = () => {
     return useQuery({
         queryKey:["current-system-academi-year"],
         queryFn: () => getCurrentSystemAcademicYear(),
     })
}
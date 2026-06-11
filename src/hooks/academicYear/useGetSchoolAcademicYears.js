import { useQuery } from "@tanstack/react-query";
import { getSchoolAcademicYears } from "../../services/academicYear";

export const useGetSchoolAcademicYears = () => {
     return useQuery({
         queryKey:["school-academic-years"],
         queryFn:() => getSchoolAcademicYears(),
     })
}
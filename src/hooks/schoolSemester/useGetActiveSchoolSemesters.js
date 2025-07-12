import { useQuery } from "@tanstack/react-query";
import { getActiveSchoolSemester } from "../../services/schoolSemester";

export const useGetActiveSchoolSemesters = () => {
     return useQuery({
       queryKey: ['activeSchoolSemesters'],
       queryFn: getActiveSchoolSemester ,
     });
}
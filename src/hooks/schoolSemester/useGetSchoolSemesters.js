import { useQuery } from "@tanstack/react-query";
import { getSchoolSemesters } from "../../services/schoolSemester";

export const useGetActiveSchoolSemesters = () => {
     return useQuery({
           queryKey: ['schoolSemesters'],
           queryFn: () => getSchoolSemesters(),
    });
}
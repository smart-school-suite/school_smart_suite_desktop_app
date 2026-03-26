import { useQuery } from "@tanstack/react-query";
import { getSchoolSemesters } from "../../services/schoolSemester";

export const useGetSchoolSemesters = () => {
     return useQuery({
           queryKey: ['schoolSemesters'],
           queryFn: () => getSchoolSemesters(),
    });
}
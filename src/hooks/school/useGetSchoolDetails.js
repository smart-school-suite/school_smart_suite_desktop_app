import { useQuery } from "@tanstack/react-query";
import { getSchoolDetails } from "../../services/school";

export const useGetSchoolDetails = (schoolId) => {
    return useQuery({
             queryKey: ['school', schoolId],
             queryFn: () => getSchoolDetails(schoolId),
             enabled: !!schoolId,
    });
}
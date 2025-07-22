import { useQuery } from "@tanstack/react-query";
import { getSchoolDetails } from "../../services/school";

export const useGetSchoolDetails = () => {
    return useQuery({
             queryKey: ['school'],
             queryFn: () => getSchoolDetails(),
    });
}
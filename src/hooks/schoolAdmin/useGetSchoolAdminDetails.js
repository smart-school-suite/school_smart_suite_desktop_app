import { useQuery } from "@tanstack/react-query";
import { getSchoolAdminDetails } from "../../services/schoolAdmin";

export const useGetSchoolAdminDetails = (schoolAdminId) => {
     return useQuery({
                 queryKey: ['schoolAdmin', schoolAdminId],
                 queryFn: () => getSchoolAdminDetails(schoolAdminId),
                 enabled: !!schoolAdminId,
        });
}
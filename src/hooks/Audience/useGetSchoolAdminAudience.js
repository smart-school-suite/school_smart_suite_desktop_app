import { getSchoolAdminAudience } from "../../services/audience";
import { useQuery } from "@tanstack/react-query";

export const useGetSchoolAdminAudience = () => {
     return useQuery({
         queryKey:["school-admin-audience"],
         queryFn: () => getSchoolAdminAudience()
     })
}
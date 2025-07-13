import { useQuery } from "@tanstack/react-query";
import { getSchoolAdminPermissions } from "../../services/permission";

export const useGetSchoolAdminPermissions = (schoolAdminId) => {
    return useQuery({
         queryKey:["schoolAdminPermission", schoolAdminId],
         queryFn:getSchoolAdminPermissions(schoolAdminId)
    })
}
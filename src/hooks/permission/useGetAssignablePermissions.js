import { getAssignableSchoolAdminPermission } from "../../services/permission";
import { useQuery } from "@tanstack/react-query";

export const useGetAssignablePermission = (schoolAdminId) => {
    return useQuery({
         queryKey:["assignablePermissions", schoolAdminId],
         queryFn:() => getAssignableSchoolAdminPermission(schoolAdminId)
    })
}
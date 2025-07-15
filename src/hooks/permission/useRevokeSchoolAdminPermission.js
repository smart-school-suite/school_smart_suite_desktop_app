import { useMutation, useQueryClient } from "@tanstack/react-query";
import { revokePermission } from "../../services/permission";

export const useRevokeSchoolAdminPermissions = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:({schoolAdminId, permission}) => revokePermission(schoolAdminId, {permissions:permission}),
        onSuccess:(schoolAdminId) => {
            queryClient.invalidateQueries({ queryKey:["schoolAdminPermission", schoolAdminId] })
            queryClient.removeQueries({ queryKey:["assignablePermissions", schoolAdminId]})
        }
    })
}
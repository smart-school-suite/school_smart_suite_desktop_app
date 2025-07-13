import { useMutation, useQueryClient } from "@tanstack/react-query";
import { revokePermission } from "../../services/permission";

export const useRevokeSchoolAdminPermissions = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:(schoolAdminId) => revokePermission(schoolAdminId),
        onSuccess:(schoolAdminId) => {
            queryClient.invalidateQueries({ queryKey:["schoolAdminPermission", schoolAdminId] })
        }
    })
}
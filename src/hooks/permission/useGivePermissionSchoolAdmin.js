import { useMutation, useQueryClient } from "@tanstack/react-query";
import { givePermissionToSchoolAdmin } from "../../services/permission";

export const useGivePermissionSchoolAdmin = () => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn:(schoolAdminId) => givePermissionToSchoolAdmin(schoolAdminId),
         onSuccess:(schoolAdminId) => {
             queryClient.removeQueries({ queryKey:["schoolAdminPermission", schoolAdminPermission]})
         }
     })
}
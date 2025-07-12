import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deactivateSchoolAdminAccount } from "../../services/schoolAdmin";

export const useDeactivateSchoolAdmin =  () => {
     const queryClient = useQueryClient();
     return useMutation({ 
        mutationFn:(schoolAdminId) => deactivateSchoolAdminAccount(schoolAdminId),
        onSuccess: (schoolAdminId) => {
            queryClient.invalidateQueries({ queryKey:["schoolAdmins"]})
            queryClient.removeQueries({ queryKey:["schoolAdmin", schoolAdminId]})
        }
     })
}
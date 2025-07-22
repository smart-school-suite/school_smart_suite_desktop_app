import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSchoolAdmin } from "../../services/schoolAdmin";

export const useUpdateSchoolAdmin = () => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn:({ schoolAdminId, updateData }) => updateSchoolAdmin(schoolAdminId, updateData),
         onSuccess:(schoolAdminId) => {
            queryClient.removeQueries({ queryKey:["schoolAdmin", schoolAdminId]})
            queryClient.invalidateQueries({ queryKey:["schoolAdmins"]});
         }
     })
}
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSchoolAdmin } from "../../services/schoolAdmin";

export const useDeleteSchoolAdmin = () => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn:deleteSchoolAdmin,
         onSuccess: (data, deletedSchoolAdminId) => {
        queryClient.invalidateQueries({ queryKey: ['schoolAdmins'] })
        queryClient.removeQueries({ queryKey: ['schoolAdmin', deletedSchoolAdminId] })
     }
     })
}
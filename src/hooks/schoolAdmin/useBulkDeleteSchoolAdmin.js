import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkDeleteSchoolAdmin } from "../../services/schoolAdmin";

export const useBulkDeleteSchoolAdmins = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:bulkDeleteSchoolAdmin,
         onSuccess:() => {
             queryClient.invalidateQueries({ queryKey:["schoolAdmins"]})
         }
    })
}
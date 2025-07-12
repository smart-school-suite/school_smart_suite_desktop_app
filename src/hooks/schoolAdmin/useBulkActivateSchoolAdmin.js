import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkActivateSchoolAdmin } from "../../services/schoolAdmin";

export const useBulkActivateSchoolAdmins = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:bulkActivateSchoolAdmin,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["schoolAdmins"]})
         }
    })
}
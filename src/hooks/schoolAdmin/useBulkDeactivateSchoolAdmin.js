import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkDeactivateSchoolAdmin } from "../../services/schoolAdmin";

export const useBulkDeactivateSchoolAdmin = () => { 
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:bulkDeactivateSchoolAdmin,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["schoolAdmins"]})
         }
    })
}
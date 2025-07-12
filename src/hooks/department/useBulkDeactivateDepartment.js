import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkDeactivateDepartment } from "../../services/department";

export const useBulkDeactivateDepartment = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:bulkDeactivateDepartment,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["departments"]})
         }
    })
}
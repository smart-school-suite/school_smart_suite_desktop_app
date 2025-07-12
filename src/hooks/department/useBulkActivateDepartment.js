import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkActivateDepartment } from "../../services/department";

export const useBulkActivateDepartment = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:bulkActivateDepartment,
         onSuccess:() => { 
             queryClient.invalidateQueries({ queryKey:["departments"]})
         }
    })
}
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkDeleteDepartment } from "../../services/department";

export const useBulkDeleteDepartment = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:bulkDeleteDepartment,
         onSuccess:() =>{
            queryClient.invalidateQueries({ queryKey:["departments"]})
         }
    })
}
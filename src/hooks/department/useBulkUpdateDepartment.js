import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkUpdateDepartment } from "../../services/department";

export const useBulkUpdateDepartment = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:({ updateData }) => bulkUpdateDepartment(updateData),
        onSuccess:() => {
             queryClient.invalidateQueries({ queryKey:["departments"]})
        }
    })
}
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDepartment } from "../../services/department";

export const useDeleteDepartment = () => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn:deleteDepartment,
         onSuccess: (departmentId) => {
            queryClient.invalidateQueries({queryKey:["departments"]})
            queryClient.removeQueries({ queryKey:["department", departmentId]})
         }
     })
}
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deactivateDepartment } from "../../services/department";

export const useDeactivateDepartment = () => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn:(departmentId) => deactivateDepartment(departmentId),
         onSuccess:(departmentId) => {
            queryClient.invalidateQueries({ queryKey:["departments"]})
            queryClient.removeQueries({ queryKey:["department", departmentId]})
         }
     })
}
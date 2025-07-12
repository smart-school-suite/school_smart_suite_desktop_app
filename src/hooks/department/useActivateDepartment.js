import { useMutation, useQueryClient } from "@tanstack/react-query";
import { activateDepartment } from "../../services/department";

export const useActivateDepartment = () => {
    const queryClient = useQueryClient();
    return useMutation({ 
        mutationFn:(departmentId) => activateDepartment(departmentId),
        onSuccess:(departmentId) => {
            queryClient.invalidateQueries({ queryKey:["departments"]})
            queryClient.removeQueries({queryKey:["department", departmentId] })
        }
    })
}
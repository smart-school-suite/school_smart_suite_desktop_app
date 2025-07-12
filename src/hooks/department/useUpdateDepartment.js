import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDepartment } from "../../services/department";

export const useUpdateDepartment = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:({ departmentId, updateData }) => updateDepartment(departmentId, updateData),
         onSuccess:(departmentId) => {
            queryClient.invalidateQueries({ queryKey:["departments"]})
            queryClient.removeQueries({ queryKey:["department", departmentId] })
         }
    })
}
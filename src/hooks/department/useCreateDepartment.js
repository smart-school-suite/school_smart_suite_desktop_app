import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDepartment } from "../../services/department";

export const useCreateDepartment = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:createDepartment,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["departments"]})
         }
    })
}
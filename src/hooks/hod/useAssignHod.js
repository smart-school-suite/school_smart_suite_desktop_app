import { assignHeadOfDepartment } from "../../services/hod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAssignHod = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:assignHeadOfDepartment,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["hods"]})
         }
    })
}
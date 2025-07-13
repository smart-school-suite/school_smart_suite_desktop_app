import { bulkDeleteStudentResit } from "../../services/studentResit";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useBulkDeleteStudentResit = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:bulkDeleteStudentResit,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["studentResits"] })
         }
    })
}
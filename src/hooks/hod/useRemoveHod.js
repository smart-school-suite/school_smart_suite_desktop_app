import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeHod } from "../../services/hod";

export const useRemoveHod = ( ) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:(hodId) => removeHod(hodId),
         onSuccess:(hodId) => {
            queryClient.invalidateQueries({ queryKey:["hods"]})
            queryClient.removeQueries({ queryKey:["hod", hodId]})
         }
    })
}
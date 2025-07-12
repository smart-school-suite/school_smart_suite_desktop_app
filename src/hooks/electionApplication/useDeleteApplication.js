import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteApplication } from "../../services/electionApplication";

export const useDeleteApplications = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:deleteApplication,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["electionApplications"] })
         }
    })
}
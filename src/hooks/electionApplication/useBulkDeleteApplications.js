import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkDeleteApplications } from "../../services/electionApplication";

export const useBulkDeleteApplications = () => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn:bulkDeleteApplications,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["electionApplications"] })
         }
     })
}
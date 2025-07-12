import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkApproveApplications } from "../../services/electionApplication";

export const useBulkApproveApplications = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:bulkApproveApplications,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["electionApplications"] })
         }
    })
}
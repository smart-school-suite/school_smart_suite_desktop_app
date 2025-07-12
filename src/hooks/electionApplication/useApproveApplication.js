import { useMutation, useQueryClient } from "@tanstack/react-query";
import { approveApplication } from "../../services/electionApplication";

export const useApproveElectionApplication = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:approveApplication,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["electionApplications"]})
         }
    })
}
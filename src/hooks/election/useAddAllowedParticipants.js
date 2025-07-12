import { addAllowedParticipants } from "../../services/election";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddAllowedElectionParticipants = () => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn:({ electionId, participantData}) => addAllowedParticipants(electionId, participantData),
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["allowedElectionParticipants"]})
         }
     })
}
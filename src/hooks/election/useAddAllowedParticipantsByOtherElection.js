import { useMutation } from "@tanstack/react-query";
import { addAllowedParticipantsByOtherElection } from "../../services/election";

export const useAddAllowedElectionParticipantsByOtherElection = () => {
    return useMutation({
         mutationFn:({ electionId, targetElectionId }) => addAllowedParticipantsByOtherElection(electionId, targetElectionId),
    })
}
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addAllowedParticipantsByElection } from "../../services/election";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useAddElectionParticipantsByElection = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:({ electionId, targetElectionId }) => addAllowedParticipantsByElection(electionId, targetElectionId),
          onSuccess: () => {
             queryClient.invalidateQueries({ queryKey:["elections"]})
             if(handleClose){
                 handleClose();
             }

             toast.custom(
                 <ToastSuccess 
                   title={"Election Created"}
                   description={"Election Created Successfully"}
                 />
             )
         },
         onError:(error) => {
             toast.custom(
                 <ToastDanger 
                  title={error.response.data.errors.title}
                  description={error.response.data.errors.description}
                 />
             )
         }
    })
}
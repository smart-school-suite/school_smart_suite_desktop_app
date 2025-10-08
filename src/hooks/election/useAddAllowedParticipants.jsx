import { addAllowedParticipants } from "../../services/election";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useAddAllowedElectionParticipants = (handleClose) => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn:({ electionId, participantData}) => addAllowedParticipants(electionId, participantData),
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["allowedElectionParticipants"]})
            if(handleClose){
                 handleClose();
            }

            toast.custom(
                 <ToastSuccess 
                   title={"Participants Created"}
                   description={"Election Participants Added Successfully"}
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
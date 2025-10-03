import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deactivateElectionType } from "../../services/electionType";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useDeactivateElectionType = (handleClose) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:(electionTypeId) => deactivateElectionType(electionTypeId),
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["electionTypes"]})
            queryClient.invalidateQueries({ queryKey:["activeElectionTypes"] })
             
            if(handleClose){
                 handleClose();
            }

            toast.custom(
                 <ToastSuccess 
                   title={"Deactivation Successfull"}
                   description={"Election Type Deactivated Successfully"}
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
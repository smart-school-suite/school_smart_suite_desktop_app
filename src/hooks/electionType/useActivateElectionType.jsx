import { useMutation, useQueryClient } from "@tanstack/react-query";
import { activateElectionType } from "../../services/electionType";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useActivateElectionType = (handleClose) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:(electionTypeId) => activateElectionType(electionTypeId),
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["electionTypes"]})
            queryClient.invalidateQueries({ queryKey:["activeElectionTypes"] })
            if(handleClose){
                 handleClose();
            }

            toast.custom(
                 <ToastSuccess 
                   title={"Activation Successfull"}
                   description={"Election Type Activated Sucessfully"}
                 />
            )
         },
    })
}
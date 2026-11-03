import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createElectionType } from "../../services/electionType";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useCreateElectionType = (handleClose) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:createElectionType,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["electionTypes"]})
            if(handleClose){
                 handleClose();
            }

            toast.custom(
                 <ToastSuccess 
                   title={"Election Type Created"}
                   description={"Election Type Created Successfully"}
                 />
            )
         },
    })
}
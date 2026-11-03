import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteResitCandidate } from "../../services/resitCandidate";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";

export const useDeleteResitCandidates = (handleClose) => {
    const queryClient = useQueryClient();
     return useMutation({
         mutationFn:deleteResitCandidate,
         onSuccess:() => {
             queryClient.invalidateQueries({ queryKey:["resitCandidates"] })
             if(handleClose){
                handleClose();
             }

             toast.custom(
                <ToastSuccess 
                  title={"Delete Successfull"}
                  description={"Candidate Deleted Successfully"}
                />
             )
         },
     })
}
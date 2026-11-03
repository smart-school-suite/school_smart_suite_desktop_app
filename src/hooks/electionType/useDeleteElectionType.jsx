import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteElectionType } from "../../services/electionType";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useDeleteElectionType = (handleClose, electionTypeId) => {
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn:deleteElectionType,
      onSuccess:() => {
         queryClient.invalidateQueries({ queryKey:["electionType"] })
         queryClient.invalidateQueries({ queryKey:["electionTypes", electionTypeId] })
         if(handleClose){
             handleClose();
         }
         toast.custom(
             <ToastSuccess 
               title={"Delete Successfull"}
               description={"Election Type Deleted Successfully"}
             />
         )
      },
   })
}
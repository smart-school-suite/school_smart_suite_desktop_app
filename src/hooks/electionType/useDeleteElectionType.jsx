import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteElectionType } from "../../services/electionType";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
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
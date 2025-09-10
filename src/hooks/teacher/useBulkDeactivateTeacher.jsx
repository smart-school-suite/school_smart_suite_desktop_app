import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkDeactivateTeacher } from "../../services/teacher";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
export const useBulkDeactivateTeacher = (handleClose, resetAll) => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn:bulkDeactivateTeacher,
         onSuccess:() => {
              queryClient.invalidateQueries({ queryKey:["teachers"] })
              if(handleClose){
               handleClose();
              }
              if(resetAll){
                 resetAll();
              }

              toast.custom(
                 <ToastSuccess 
                   title={"Deactivation Successfull"}
                   description={"Teacher Account Deactivated Successfully"}
                 />
              )
         },
         onError:() => {
              toast.custom(
                <ToastDanger 
                   title={"Deactivation Failed"}
                   description={"Failed to deactivate Teacher Account Please Check Internet Connection and try again"}
                />
              )
         }
     })
}
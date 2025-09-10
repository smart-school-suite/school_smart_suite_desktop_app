import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkDeleteTeacher } from "../../services/teacher";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
export const useBulkDeleteTeacher = (handleClose, resetAll) => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn:bulkDeleteTeacher,
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
                  title={"Delete Successfull"}
                  description={"Teacher Deleted Successfully"}
                />
              )
         },
         onError:() => {
              toast.custom(
                <ToastDanger 
                  title={"Delete Failed"}
                  description={"Failed to delete teacher please check internet connection and try again"}
                />
              )
         }
     })
}
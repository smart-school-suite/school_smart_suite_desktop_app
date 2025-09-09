import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkActivateDepartment } from "../../services/department";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
export const useBulkActivateDepartment = (handleClose, resetAll) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:bulkActivateDepartment,
         onSuccess:() => { 
             queryClient.invalidateQueries({ queryKey:["departments"]})
             if(handleClose){
                handleClose();
             }
             if(resetAll){
                resetAll();
             }

             toast.custom(
                 <ToastSuccess 
                   title={"Department Activated"}
                   description={"Department Activated Successfully"}
                 />
             )
         },
         onError:() => {
             toast.custom(
                 <ToastDanger 
                   title={"Failed Activate"}
                   description={"Failed to activate department due to an internal error, please check internet connection and try again"}
                 />
             )
         }
    })
}
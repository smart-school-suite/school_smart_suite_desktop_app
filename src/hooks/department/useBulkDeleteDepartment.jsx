import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkDeleteDepartment } from "../../services/department";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
export const useBulkDeleteDepartment = (handleClose, resetAll) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:bulkDeleteDepartment,
         onSuccess:() =>{
            queryClient.invalidateQueries({ queryKey:["departments"]})
            if(handleClose){
                handleClose();
            }

            if(resetAll){
                resetAll();
            }

            toast.custom(
                 <ToastSuccess 
                   title={"Delete Successfull"}
                   description={"Department Deleted Successfully, This Action Cannot Be Undone"}
                 />
            )
         },
         onError: () => {
             toast.custom(
                <ToastDanger 
                  title={"Delete Failed"}
                  description={"Failed to delete department due to an internal error, please check internet connection and try again"}
                />
             )
         }
    })
}
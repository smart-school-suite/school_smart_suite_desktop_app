import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkDeleteSchoolAdmin } from "../../services/schoolAdmin";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useBulkDeleteSchoolAdmins = (handleClose, resetAll) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:bulkDeleteSchoolAdmin,
         onSuccess:() => {
             queryClient.invalidateQueries({ queryKey:["schoolAdmins"]})

             if(handleClose){
                handleClose();
             }

             if(resetAll){
               resetAll();
             }
             toast.custom(
                <ToastSuccess 
                  title={"Delete Successfull"}
                  description={"Account Deleted Successfully"}
                />
             )
         },
         onError:() => {
            toast.custom(
                <ToastDanger 
                  title={"Delete Failed"}
                  description={"Failed to delete account due to an error please try again"}
                />
            )
         }
    })
}
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkDeactivateSchoolAdmin } from "../../services/schoolAdmin";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useBulkDeactivateSchoolAdmin = (handleClose, resetAll) => { 
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:bulkDeactivateSchoolAdmin,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["schoolAdmins"]})

            if(handleClose){
                handleClose();
            }

            if(resetAll){
                resetAll()
            }
            toast.custom(
                <ToastSuccess 
                  title={"Account Deactivated"}
                  description={"Account Deactivated Successfully"}
                 />
            )
         },
         onError:() => {
             toast.custom(
                <ToastDanger 
                  title={"Deactivation Failed"}
                  description={"Failed to deactivate Account Due to an error please try again"}
                />
             )
         }
    })
}
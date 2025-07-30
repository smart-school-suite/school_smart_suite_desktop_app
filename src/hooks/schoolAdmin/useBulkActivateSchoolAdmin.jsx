import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkActivateSchoolAdmin } from "../../services/schoolAdmin";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useBulkActivateSchoolAdmins = (handleClose, resetAll) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:bulkActivateSchoolAdmin,
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
                  title={"Activation Successfull"}
                  description={"Account Activated Successfully"}
                />
            )

            
         },
         onError:() => {
             toast.custom(
                <ToastDanger 
                  title={"Activation Failed"}
                  description={"Failed to activate account please try again"}
                />
             )
         }
    })
}
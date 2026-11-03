import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deactivateSchoolAdminAccount } from "../../services/schoolAdmin";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useDeactivateSchoolAdmin =  (handleClose) => {
     const queryClient = useQueryClient();
     return useMutation({ 
        mutationFn:(schoolAdminId) => deactivateSchoolAdminAccount(schoolAdminId),
        onSuccess: (schoolAdminId) => {
            queryClient.invalidateQueries({ queryKey:["schoolAdmins"]})
            queryClient.removeQueries({ queryKey:["schoolAdmin", schoolAdminId]})

            if(handleClose){
                handleClose();
            }

            toast.custom(
                <ToastSuccess 
                  title={"Account Deactivated"}
                  description={"Account Deactivated Successfully"}
                />
            )
        },
     })
}
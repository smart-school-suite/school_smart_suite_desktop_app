import { updateSchoolAdminProfile } from "../../services/schoolAdmin";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";

export const useUpdateSchoolAdminProfile = (handleClose, attribute) => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn:({ updateData }) => updateSchoolAdminProfile(updateData),
         onSuccess:() => {
             queryClient.invalidateQueries({ queryKey:["schoolAdmins"]})
             queryClient.invalidateQueries({ queryKey:["authSchoolAdmin"]})

             if(handleClose){
                handleClose();
             }

             toast.custom(
                <ToastSuccess 
                   title={"Update Successfull"}
                   description={`${attribute}, Was successfully updated`}
                />
             )
         },
     })
}
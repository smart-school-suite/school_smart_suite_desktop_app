import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSchoolAdmin } from "../../services/schoolAdmin";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
export const useUpdateSchoolAdmin = (handleClose) => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn:({ schoolAdminId, updateData }) => updateSchoolAdmin(schoolAdminId, updateData),
         onSuccess:(schoolAdminId) => {
            queryClient.removeQueries({ queryKey:["schoolAdmin", schoolAdminId]})
            queryClient.invalidateQueries({ queryKey:["schoolAdmins"]});

            if(handleClose){
                handleClose();
            }

            toast.custom(
                <ToastSuccess 
                  title={"Update Successfull"}
                  description={"Account Updated Successfully"}
                />
            )
         },
         onError:() => {
             toast.custom(
                <ToastDanger 
                  title={"Update Failed"}
                  description={"Account Update Failed Due to an error please try again!!"}
                />
             )
         }
     })
}
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSchool } from "../../services/school";
import ToastDanger from "../../components/Toast/ToastDanger"
import ToastSuccess from "../../components/Toast/ToastSuccess";
import toast from "react-hot-toast";
export const useUpdateSchool = (handleClose, attribute) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:({ updateData }) => updateSchool(updateData),
         onSuccess:() => {
             queryClient.invalidateQueries({ queryKey:["school"] })
             if(handleClose) {
                handleClose();
             }

             toast.custom(
                <ToastSuccess 
                  title={"Update Successfull"}
                  description={`${attribute}, updated successfully`}
                />
             )
         },
         onError:() => {
             toast.custom(
                <ToastDanger 
                  title={"Updated Failed"}
                  description={`Failed to update ${attribute} due to an error please try again !!`}
                />
             )
         }
    })
}
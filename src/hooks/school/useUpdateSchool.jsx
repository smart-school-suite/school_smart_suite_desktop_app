import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSchool } from "../../services/school";
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
    })
}
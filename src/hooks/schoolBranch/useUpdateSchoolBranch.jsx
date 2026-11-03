import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSchoolBranch } from "../../services/schoolBranch";

export const useUpdateSchoolBranch = (handleClose, attribute) => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn:({ updateData }) => updateSchoolBranch(updateData),
         onSuccess: () => {
             queryClient.invalidateQueries({queryKey:["schoolBranch"]})
             queryClient.invalidateQueries({queryKey:["school"]})
             if(handleClose){
                handleClose();
             }

             toast.custom(
                <ToastSuccess 
                  title={"Update Successfull"}
                  description={`${attribute} updated Successfully`}
                />
             )
         },

     })
}
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCaMark } from "../../services/evaluateStudent";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
export const useUpdateCaMarks = (handleClose) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:updateCaMark,
         onSuccess:() => {
             queryClient.invalidateQueries({ queryKey:["examCandidates"] })
             if(handleClose){
                 handleClose();
             }

             toast.custom(
                 <ToastSuccess 
                   title={"Update Successfull"}
                   description={"CA Scores Updated Successfully"}
                 />
             )

         },
         onError:() => {
             toast.custom(
                 <ToastDanger 
                   title={"Update Failed"}
                   description={"Failed to update CA Scores Please check internet connection and try again"}
                 />
             )
         }
    })
}
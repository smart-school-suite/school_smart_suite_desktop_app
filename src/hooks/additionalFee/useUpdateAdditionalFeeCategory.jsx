import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAdditionalFeeCategory } from "../../services/additionalFee";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useUpdateAdditionalFeeCategory = (handleClose) => {
     const queryClient = useQueryClient();
     return useMutation({ 
        mutationFn:({ categoryId, updateData }) => updateAdditionalFeeCategory(categoryId, updateData),
        onSuccess: () => {
             queryClient.invalidateQueries({ queryKey:["additionalFeeCategories"]})
             if(handleClose){
               handleClose();
             }

             toast.custom(
               <ToastSuccess 
                 title={"Update Successfull"}
                 description={"Category Updated Successfully"}
               />
             )
        },
        onError:() => {
            toast.custom(
               <ToastDanger 
                 title={"Update Failed"}
                 description={"Failed to update Category Please try Again"}
               />
            )
        }
     })
}
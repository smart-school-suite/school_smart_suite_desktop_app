import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAdditionalFeeCategory } from "../../services/additionalFee";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useCreateAdditionalFeeCategory = (handleClose) => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn:createAdditionalFeeCategory,
         onSuccess: () => {
             queryClient.invalidateQueries({ queryKey:["additionalFeeCategories"] })

             if(handleClose){
                 handleClose();
             }

             toast.custom(
                <ToastSuccess 
                  title={"Created Successfully"}
                  description={"Additional Fee Category Created Successfully"}
                />
             )
         }, 
     });
}
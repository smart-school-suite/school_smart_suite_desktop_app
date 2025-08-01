import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAdditionalFee } from "../../services/additionalFee";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useUpdateAdditionalFee = (handleClose, additionalFeeId) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn: ({ additionalFeeId, updateData }) => updateAdditionalFee(additionalFeeId, updateData),
         onSuccess: () => {
             queryClient.invalidateQueries({ queryKey:["additionalFees"] })
             queryClient.removeQueries({ queryKey:["additionalFee", additionalFeeId] })

             if(handleClose){
                handleClose();
             }

             toast.custom(
                <ToastSuccess 
                  title={"Update Successful"}
                  description={"Additional Fees Updated Successfully"}
                />
             )
         },
         onError:() => {
             toast.custom(
                <ToastDanger 
                  title={"Update Failed"}
                  description={"Update Failed Due to an error Please try again later"}
                />
             )
         }
    })
}
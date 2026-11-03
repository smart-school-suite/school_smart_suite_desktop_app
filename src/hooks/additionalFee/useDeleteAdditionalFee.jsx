import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAdditionalFee } from "../../services/additionalFee";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useDeleteAdditionalFee = (handleClose, additionalFeeId) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:deleteAdditionalFee,
         onSuccess: () => {
             queryClient.invalidateQueries({ queryKey:["additionalFees"] })
             queryClient.invalidateQueries({ queryKey:["additionalFee", additionalFeeId]})
             if(handleClose){
                handleClose();
             }

             toast.custom(
                <ToastSuccess 
                   title={"Delete Successfull"}
                   description={"Additional Fee Deleted Successfully"}
                />
             )
         },
    })
}
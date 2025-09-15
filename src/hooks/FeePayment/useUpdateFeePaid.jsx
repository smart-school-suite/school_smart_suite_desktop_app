import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateFeesPaid } from "../../services/feePayment";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";

export const useUpdateFeesPaid = (handleClose) => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn:updateFeesPaid,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["feesPaid"] })

            if(handleClose){ 
                handleClose();
            }

            toast.custom(
                 <ToastSuccess 
                   title={"Update Successfull"}
                   description={"Fee Paid updated Successfully"}
                 />
            )
         },
         onError:() => {
             toast.custom(
                 <ToastDanger 
                   title={"Update Failed"}
                   description={"Failed to update fee paid due to an error please check internet connection and try again"}
                 />
             )
         }
     })
}
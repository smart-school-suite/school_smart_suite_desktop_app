import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkDeleteAdditionalFeeTransactions } from "../../services/additionalFee";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useBulkDeleteAdditionalFeeTransaction = (handleClose, resetAll) => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn:bulkDeleteAdditionalFeeTransactions,
         onSuccess:() => {
             queryClient.invalidateQueries({ queryKey:["additionalFeeTransactions"]})

             if(handleClose){
                handleClose();
             }

             if(resetAll){
                resetAll();
             }

             toast.custom(
                 <ToastSuccess 
                   title={"Transaction Reversed"}
                   description={"Transaction Reversed Successfully"}
                 />
             )
         },
         onError:() => {
             toast.custom(
                 <ToastDanger 
                   title={"Failed Transaction Reversal"}
                   description={"Failed to reverse transaction due to an error please check internet connection and try again"}
                 />
             )
         }
     })
}
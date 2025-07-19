import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reverseAdditionalFeeTransaction } from "../../services/additionalFee";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useReverseAdditionalFeeTransaction = (handleClose, transactionId) => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn:reverseAdditionalFeeTransaction,
         onSuccess: () => {
             queryClient.invalidateQueries({ queryKey:["additionalFeeTransactions"]}),
             queryClient.invalidateQueries({ queryKey:["additionalFees"] })
             queryClient.invalidateQueries({ queryKey:["additionalFeetransaction", transactionId]})

             if(handleClose){
                handleClose();
             }

             toast.custom(
                <ToastSuccess
                  title={"Transaction Successfull"}
                  description={"Transaction Successfully Reversed"}
                />
             )
         },
         onError:() => {
             toast.custom(
                <ToastDanger 
                  title={"Transaction Failed"}
                  description={"Failed to reverse additional fee transaction"}
                />
             )
         }
     })
}
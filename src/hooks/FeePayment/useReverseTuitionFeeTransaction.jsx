import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reverseTuitionFeeTransaction } from "../../services/feePayment";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useReverseTuitionFeeTransaction = (handleClose, transactionId) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:(transactionId) => reverseTuitionFeeTransaction(transactionId),
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["tuitionFeeTransactions"] })
            queryClient.invalidateQueries({ queryKey:["tuitionFeeTransaction", transactionId] })
            queryClient.invalidateQueries({ queryKey:["tuitionFees"] })

            if(handleClose){
                handleClose();
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
                  title={"Failed Reverse"}
                  description={"Failed to reverse transaction please try again later"}
                />
             )
         }
    })
}
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reverseRegistrationFeeTransaction } from "../../services/feePayment";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useReverseRegistrationFeeTransaction = (handleClose) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:(transactionId) => reverseRegistrationFeeTransaction(transactionId),
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["registrationFeeTransactions"] })
            queryClient.invalidateQueries({ queryKey:["registrationFees"]})

            if(handleClose){
                handleClose();
            }

            toast.custom(
                <ToastSuccess 
                   title={"Reversal Successfull"}
                   description={"Transaction Reversal Was Successfully Completed"}
                />
            )
         },
         onError:() => {
            toast.custom(
                <ToastDanger 
                  title={"Reversal Failed"}
                  description={"Transaction Reversal Was UnSuccessfull Due To An Error"}
                />
            )
         }
    })
}
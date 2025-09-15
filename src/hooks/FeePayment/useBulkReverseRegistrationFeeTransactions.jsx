import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkReverseRegistrationFeeTransaction } from "../../services/feePayment";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import toast from "react-hot-toast";
export const useBulkReverseRegistrationFeeTransactions = (handleClose, resetAll) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:bulkReverseRegistrationFeeTransaction,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["registrationFeeTransactions"] })
             queryClient.invalidateQueries({ queryKey:["registrationFees"]})
             if(handleClose){
                handleClose();
            }
         
            if(resetAll){
                 resetAll();
            }

            toast.custom(
                 <ToastSuccess 
                   title={"Reverse Successfull"}
                   description={"Transaction Reversed Successfully"}
                 />
            )
             
         },
         onError:() => {
             toast.custom(
                 <ToastDanger 
                   title={"Reverse Failed"}
                   description={"Failed to reverse transaction due to an error please check internet connection and try again later"}
                 />
             )
         }
    })
}
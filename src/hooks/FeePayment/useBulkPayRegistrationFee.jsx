import { bulkPayRegistrationFee } from "../../services/feePayment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useBulkPayRegistrationFees = (handleClose, resetAll) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:bulkPayRegistrationFee,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["registrationFees"]})
            queryClient.invalidateQueries({ queryKey:["registrationFeeTransactions"] })

            if(handleClose){
                handleClose();
            }
         
            if(resetAll){
                 resetAll();
            }

            toast.custom(
                 <ToastSuccess 
                   title={"Transaction Successfull"}
                   description={"Registration Fee Paid Successfully"}
                 />
            )
         },
         onError:() => {
             toast.custom(
                 <ToastDanger 
                   title={"Transaction Failed"}
                   description={"Failed to pay registration fee due to an error please check internet connection and try again"}
                 />
             )
         }
    })
}
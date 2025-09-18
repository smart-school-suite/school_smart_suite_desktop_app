import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkDeleteRegistrationFeeTransactions } from "../../services/feePayment";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
export const useBulkDeleteRegistrationFeeTransactions = (handleClose, resetAll) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:bulkDeleteRegistrationFeeTransactions,
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
                   title={"Delete Successfull"}
                   description={"Registration Fee Deleted Successfully"}
                 />
             )
         },
         onError:() => {
             toast.custom(
                 <ToastDanger 
                   title={"Delete Failed"}
                   description={"Failed to delete Registration fee due to an error please check internet connection and try again"}
                 />
             )
         }
    })
}
import { deleteRegistrationFeeTransaction } from "../../services/feePayment";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ToastDanger from "../../components/Toast/ToastDanger";
export const useDeleteRegistrationFeeTransaction = (handleClose, transactionId) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:deleteRegistrationFeeTransaction,
         onSuccess:() => {
             queryClient.invalidateQueries({ queryKey:["registrationFeeTransactions"] })
             queryClient.removeQueries({ queryKey:["registrationFeeTransaction", transactionId] });
             if(handleClose){
                handleClose();
             }

             toast.custom(
                 <ToastSuccess 
                   title={"Delete Successful"}
                   description={"Registration Fee Transaction Deleted Successfully"}
                 />
             )
         },
         onError:() => {
             toast.custom(
                 <ToastDanger
                   title={"Delete Failed"}
                   description={"Failed to delete transaction due to an error please check internet connection and try again"}
                 />
             )
         }
    })
}
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTuitionFeeTransaction } from "../../services/feePayment";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
export const useDeleteTuitionFeeTransaction = (handleClose) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:deleteTuitionFeeTransaction,
         onSuccess:(transactionId) => {
            queryClient.invalidateQueries({queryKey:["tuitionFeesTransactions"]})
            queryClient.removeQueries({ queryKey:["tuitionFeeTransaction", transactionId] })
            if(handleClose){
                handleClose();
            }

            toast.custom(
                 <ToastSuccess 
                   title={"Delete Successfull"}
                   description={"Tuition Fee Transaction Deleted Successfully"}
                 />
            )
         },
         onError:() => {
             toast.custom(
                 <ToastDanger 
                  title={"Delete Failed"}
                  description={"Failed to delete tuition fee transaction due to an error please check internet connection and try again"}
                 />
             )
         }
    })
}
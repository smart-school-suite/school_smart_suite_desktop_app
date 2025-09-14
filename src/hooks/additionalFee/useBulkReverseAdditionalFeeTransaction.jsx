import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkReverseAdditionalFeeTransactions } from "../../services/additionalFee";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import toast from "react-hot-toast";
export const useBulkReverseAdditionalFeeTransactions = (handleClose, resetAll) => {
     const queryClient = useQueryClient();
     return useMutation({ 
        mutationFn:bulkReverseAdditionalFeeTransactions,
        onSuccess:() => {
             queryClient.invalidateQueries({ queryKey:["additionalFeeTransactions"]})
             queryClient.invalidateQueries({ queryKey:["additionalFees"]})

             if(resetAll){
               resetAll();
             }

             if(handleClose){
               handleClose();
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
                  title={"Failed Transaction Reverse"}
                  description={"Failed to reverse all transaction due to an error please check internet connection and try again"}
                />
             )
        }
     });
}
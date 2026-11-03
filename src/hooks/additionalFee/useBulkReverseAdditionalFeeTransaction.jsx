import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkReverseAdditionalFeeTransactions } from "../../services/additionalFee";
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
     });
}
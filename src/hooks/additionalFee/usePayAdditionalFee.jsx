import { useMutation, useQueryClient } from "@tanstack/react-query";
import { payAdditionalFee } from "../../services/additionalFee";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const usePayAdditionalFee =  (handleClose, additionalFeeId) => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn:payAdditionalFee,
         onSuccess: () => {
             queryClient.invalidateQueries({ queryKey:["additionalFeeTransactions"] })
             queryClient.invalidateQueries({ queryKey:["additionalFees"] })
             queryClient.invalidateQueries({ queryKey:["additionalFee", additionalFeeId] })

             if(handleClose){
                handleClose();
             }

             toast.custom(
                <ToastSuccess 
                  title={"Transaction Successfull"}
                  description={"Additional Fees Paid Successfully"}
                />
             )
         },
     });
}
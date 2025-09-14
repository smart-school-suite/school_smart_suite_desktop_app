import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkPayAdditionalFee } from "../../services/additionalFee";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useBulkPayAdditionalFee = (handleClose, resetAll) => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn:bulkPayAdditionalFee,
         onSuccess: () => {
            queryClient.invalidateQueries({ queryKey:["additionalFees"] })
            queryClient.invalidateQueries({ queryKey:["additionalFeeTransactions"] })

            if(handleClose){
                handleClose();
            }

            if(resetAll){
                resetAll();
            }

            toast.custom(
                 <ToastSuccess 
                   title={"Transaction Successfull"}
                   description={"Additional Fees Paid Successfully"}
                 />
            )
         },
         onError:() => {
             toast.custom(
                 <ToastDanger 
                   title={"Transaction Failed"}
                   description={"Failed to pay additional Fees Due to an error please check internet connection and try again"}
                 />
             )
         }
     })
}
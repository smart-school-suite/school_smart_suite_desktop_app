import toast from "react-hot-toast";
import { bulkDeleteAdditionalFee } from "../../services/additionalFee";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ToastSuccess from "../../components/Toast/ToastSuccess";

export const useBulkDeleteAdditionalFee = (handleClose, resetAll) => {
     const queryClient = useQueryClient();
     return useMutation({
          mutationFn:bulkDeleteAdditionalFee,
          onSuccess:() => {
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
                   title={"Delete Successfull"}
                   description={"Additional Fee Deleted Successfully"}
                 />
            )
          },
     })
}
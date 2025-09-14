import toast from "react-hot-toast";
import { bulkDeleteAdditionalFee } from "../../services/additionalFee";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";

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
          onError:() => {
              toast.custom(
                 <ToastDanger 
                   title={"Delete Failed"}
                   description={"Failed to delete additional fee due to an internal error please check internet connection and try again"}
                 />
              )
          }
     })
}
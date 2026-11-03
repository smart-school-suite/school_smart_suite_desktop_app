import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkUpdateAdditionalFee } from "../../services/additionalFee";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useBulkUpdateAdditionalFees = (handleClose, resetAll) => {
     const queryClient = useQueryClient();
     return useMutation({
          mutationFn:bulkUpdateAdditionalFee,
          onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["additionalFees"] })

             if(handleClose){
                handleClose();
             }

             if(resetAll){
                resetAll();
             }

             toast.custom(
                <ToastSuccess 
                  title={"Update Successful"}
                  description={"Additional Fees Updated Successfully"}
                />
             )
         },
     })
}
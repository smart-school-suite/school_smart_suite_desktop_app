import { useMutation, useQueryClient } from "@tanstack/react-query";
import { payRegistrationFees } from "../../services/feePayment";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const usePayRegistrationFee = (handleClose) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:payRegistrationFees,
         onSuccess:() => {
             queryClient.invalidateQueries({ queryKey:["registrationFees"]})
             queryClient.invalidateQueries({ queryKey:["registrationFeeTransactions"] })
             
             if(handleClose){
                handleClose();
             }

             toast.custom(
                <ToastSuccess 
                   title={"Payment Successfull"}
                   description={"Payment Successfully Completed"}
                />
             )
         },
         onError:() => {
            toast.custom(
                <ToastDanger 
                  title={"Payment Failed"}
                  description={"Payment Failed Due to An Error Please Try Again Later"}
                />
            )
         }
    })
}
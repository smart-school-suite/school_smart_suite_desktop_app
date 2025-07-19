import { useMutation, useQueryClient } from "@tanstack/react-query";
import { payTuitionFees } from "../../services/feePayment";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const usePayTuitionFee = (handleClose) => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn:payTuitionFees,
         onSuccess:() => {
             queryClient.invalidateQueries({ queryKey:["feesPaid"]})
             queryClient.invalidateQueries({queryKey:["tuitionFeeTransactions"]})
             queryClient.invalidateQueries({ queryKey:["tuitionFees"] })

             if(handleClose){
                handleClose();
             }

             toast.custom(
                <ToastSuccess 
                   title={"Transaction Successfull"}
                   description={"Tuition Fee Payment Transaction Successfull"}
                />
             )
         },
         onError:() => {
            toast.custom(
                <ToastDanger 
                   title={"Transaction Failed"}
                   description={"Tuition Fee Payment Transaction Failed Due to an error please try again"}
                />
            )
         }
     })
}
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reverseTransaction } from "../../services/studentResit";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import toast from "react-hot-toast";
export const useReverseTransaction = (handleClose) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:reverseTransaction,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["resitTransactions"] })
            queryClient.invalidateQueries({ queryKey:["studentResits"] })

            if(handleClose){
                 handleClose();
            }

            toast.custom(
                 <ToastSuccess 
                   title={"Transaction Successfull"}
                   description={"Transaction Reversed Successfully"}
                 />
            )
         },
         onError:() => {
             toast.custom(
                 <ToastDanger 
                   title={"Transaction Failed"}
                   description={"Transaction Failed to an error please check internet connection and try again"}
                 />
             )
         }
    })
}
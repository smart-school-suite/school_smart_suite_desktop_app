import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkReverseTransaction } from "../../services/studentResit";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import toast from "react-hot-toast";
export const useBulkReverserResitTransactions = (handleClose, resetAll) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn: bulkReverseTransaction,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["resitTransactions"] })

            if(handleClose){
                 handleClose();
            }

            if(resetAll){
                 resetAll();
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
                   description={"Failed to reverse resit fee transaction please check internet connection and try again"}
                 />
             )
         }
    })
}
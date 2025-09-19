import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkPayStudentResit } from "../../services/studentResit";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
export const useBulkPayStudentResit = (handleClose, resetAll) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:bulkPayStudentResit,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["studentResits"] })
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
                   description={"Transaction Completed Successfully, Resit Fee Paid Successfully"}
                 />
            )
         },
         onError:() => {
             toast.custom(
                 <ToastDanger 
                   title={"Transaction Failed"}
                   description={"Failed to pay resit fee please check internet connection and try again"}
                 />
             )
         }
    })
}
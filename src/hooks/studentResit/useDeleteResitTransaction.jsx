import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteResitTransaction } from "../../services/studentResit";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useDeleteResitTransaction = (handleClose) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:deleteResitTransaction,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["resitTransactions"]})

            if(handleClose){
                 handleClose();
            }

            toast.custom(
                 <ToastSuccess 
                   title={"Delete Successfull"}
                   description={"Resit Fee Transaction Deleted Successfully"}
                 />
            )
         },
         onError:() => {
             toast.custom(
                 <ToastDanger
                    title={"Delete Failed"}
                    description={"Failed to delete resit fee transaction due to an error please check internet connection and try again"}
                 />
             )
         }
    })
}
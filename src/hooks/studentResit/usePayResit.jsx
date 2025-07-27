import { useMutation, useQueryClient } from "@tanstack/react-query";
import { payResit } from "../../services/studentResit";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
export const usePayResit = (handleClose) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:payResit,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["studentResits"] })
            queryClient.invalidateQueries({ queryKey:["resitTransactions"] })

            if(handleClose){
                handleClose();
            }

            toast.custom(
                <ToastSuccess 
                  title={"Transaction Successfull"}
                  description={"Transaction Completed Successfully"}
                />
            )
         },
         onError:() => {
             toast.custom(
                <ToastDanger
                  title={"Transaction Failed"}
                  description={"Transaction Failed Due to an error please try again later"}
                />
             )
         }
    })
}
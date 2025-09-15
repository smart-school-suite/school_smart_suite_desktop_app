import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFeePaid } from "../../services/feePayment";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useDeleteFeePaid = (handleClose) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:deleteFeePaid,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["feesPaid"]})

            if(handleClose){ 
                handleClose();
            }
            toast.custom(
                <ToastSuccess 
                  title={"Delete Successfull"}
                  description={"Fee Deleted Successfully"}
                />
            )
         },
         onError:() => {
             toast.custom(
                 <ToastDanger 
                    title={"Delete Failed"}
                    description={"Failed to delete fee due to an error please check internet connection and try again"}
                 />
             )
         }
    })
}
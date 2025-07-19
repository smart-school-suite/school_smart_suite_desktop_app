import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFeeSchedule } from "../../services/feeSchedule";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
export const useDeleteFeeSchedule = (handleClose) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:deleteFeeSchedule,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["feeSchedules"] })

            if(handleClose){
                handleClose();
            }

            toast.custom(
                <ToastSuccess 
                   title={"Delete Successfull"}
                   description={"Fee Schedule Deleted Successfully"}
                />
            )
         },
         onError:() => {
             toast.custom(
                <ToastDanger 
                   title={"Delete Failed"}
                   description={"Failed to delete fee schedule"}
                />
             )
         }
    })
}
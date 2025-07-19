import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFeeScheduleSlots } from "../../services/feeSchedule";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useCreateFeeScheduleSlots = (handleClose) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:createFeeScheduleSlots,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["feeSchedules"] })

            if(handleClose){
                handleClose();
            }

            toast.custom(
                <ToastSuccess 
                  title={"Fee Schedule Created"}
                  description={"Fee Schedule Created Successfully"}
                />
            )
         },
         onError: () => {
            toast.custom(
                <ToastDanger  
                  title={"Creation Failed"}
                  description={"Failed to create Fee Schedule Please try again"}
                />
            )
         }
    })
}
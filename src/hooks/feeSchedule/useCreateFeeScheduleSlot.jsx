import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFeeScheduleSlots } from "../../services/feeSchedule";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useCreateFeeScheduleSlots = (handleClose) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:({ feeScheduleId, scheduleData }) => createFeeScheduleSlots(feeScheduleId, scheduleData),
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
    })
}
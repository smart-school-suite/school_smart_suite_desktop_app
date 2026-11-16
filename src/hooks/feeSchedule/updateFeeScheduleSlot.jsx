import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateFeeScheduleSlots } from "../../services/feeSchedule";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useUpdateFeeScheduleSlots = (handleClose) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:({ feeScheduleId, updateData }) => updateFeeScheduleSlots(feeScheduleId, updateData),
         onSuccess:(_, { feeScheduleId }) => {
            queryClient.invalidateQueries({ queryKey:["feeSchedules"] })
            queryClient.invalidateQueries({ queryKey:["feeScheduleSlots", feeScheduleId] })

            if(handleClose){
                handleClose();
            }

            toast.custom(
                <ToastSuccess
                   title={"Fee Schedule Updated"}
                   description={"Student balances now follow the updated schedule."}
                />
            )
         },
    })
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateFeeScheduleSlots } from "../../services/feeSchedule";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useUpdateFeeScheduleSlots = (handleClose) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:({ feeScheduleId, updateData }) => updateFeeScheduleSlots(feeScheduleId, updateData),
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["feeSchedules"] })

            if(handleClose){
                handleClose();
            }

            toast.custom(
                <ToastSuccess 
                   title={"Update Successfull"}
                   description={"Fee Schedule Slots Updated Successfully"}
                />
            )
         },
         onError:() => {
            toast.custom(
                <ToastDanger 
                  title={"Update Failed"}
                  description={"Failed To Update Fee Schedule Slots"}
                />
            )
         }
    })
}
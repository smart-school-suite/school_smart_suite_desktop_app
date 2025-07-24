import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTimetableByAvailability } from "../../services/timetable";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastWarning from "../../components/Toast/ToastWarning";
export const useUpdateTimetableByAvailability = () => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:({ updateData }) => updateTimetableByAvailability(updateData),
         onSuccess:(schoolSemesterId) => {
            queryClient.removeQueries({ queryKey:["timetable", schoolSemesterId]});
            if(handleClose){
                handleClose();
            }

            toast.custom(
                <ToastSuccess
                    title={"Timetable Updated Successfully"}
                    description={"Your timetable has been updated successfully."}
                />
            )
         },
         onError: () => {
             toast.custom(
                 <ToastWarning
                     title={"Oops Something Went Wrong"}
                     description={"Couldn't update timetable, please try again."}
                 />
             );
         },
    })
}
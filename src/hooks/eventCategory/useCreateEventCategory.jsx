import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEventCategory } from "../../services/eventCategory";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
export const useCreateEventCategory = (handleClose) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:createEventCategory,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["eventCategories"]})

            if(handleClose){
                handleClose();
            }

            toast.custom(
                <ToastSuccess 
                  title={"Event Created"}
                  description={"Event Created Successfully"}
                />
            )
         },
         onError:() => {
            toast.custom(
                <ToastDanger 
                  title={"Event Creation Failed"}
                  description={"Failed to Create Event"}
                />
            )
         }
    })
}
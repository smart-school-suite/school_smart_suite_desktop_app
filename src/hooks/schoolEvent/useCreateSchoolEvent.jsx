import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSchoolEvent } from "../../services/schoolEvent";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useCreateSchoolEvent = (handleClose) =>  {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:createSchoolEvent,
        onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["schoolEvents"] })
            queryClient.invalidateQueries({ queryKey: ["draftSchoolEvent"] });
            queryClient.invalidateQueries({ queryKey: ["scheduledSchoolEvent"] });
            if(handleClose){
                 handleClose();
            }

            toast.custom(
                 <ToastSuccess 
                   title={"School Event Created"}
                   description={"School Event Created Successfully"}
                 />
            )
        },
    })
}
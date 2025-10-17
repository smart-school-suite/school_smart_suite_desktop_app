import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSchoolEvent } from "../../services/schoolEvent";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
export const useCreateSchoolEvent = (handleClose) =>  {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:createSchoolEvent,
        onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["schoolEvents"] })
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
        onError:(error) => {
              toast.custom(
                 <ToastDanger 
                  title={error.response.data.errors.title}
                  description={error.response.data.errors.description}
                 />
             )
        }
    })
}
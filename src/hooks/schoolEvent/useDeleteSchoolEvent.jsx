import { deleteSchoolEvent } from "../../services/schoolEvent";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
export const useDeleteSchoolEvent = (handleClose) => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn:deleteSchoolEvent,
         onSuccess:() => {
             queryClient.invalidateQueries({ queryKey:["schoolEvents"] })

             if(handleClose){
                 handleClose();
             }

             toast.custom(
                <ToastSuccess 
                  title={"Delete Successfull"}
                  description={"School Event Deleted Successfully"}
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
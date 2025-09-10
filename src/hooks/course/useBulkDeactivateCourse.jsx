import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkDeactivateCourse } from "../../services/course";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
export const useBulkDeactivateCourse = (handleClose, resetAll) => {
    const queryClient = useQueryClient();
     return useMutation({
         mutationFn:bulkDeactivateCourse,
         onSuccess:() => {
              queryClient.invalidateQueries({ queryKey:["courses"] })
              queryClient.invalidateQueries({ queryKey:["activeCourses"] })

              if(handleClose){
                handleClose();
              }

              if(resetAll){
                 resetAll();
              }

              toast.custom(
                 <ToastSuccess 
                   title={"Course Deactivated"}
                   description={"Course Deactivated Successfully"}
                 />
              )
         },
         onError:() => {
             toast.custom(
                 <ToastDanger 
                   title={"Course Deactivation Failed"}
                   description={'Failed to Deactivate Course Due to an error please check internet connection and try again'}
                 />
             )
         }
     })
}
import { useMutation,  useQueryClient } from "@tanstack/react-query";
import { bulkActivateCourse } from "../../services/course";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
export const useBulkActivateCourse = (handleClose, resetAll) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:bulkActivateCourse,
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
                   title={"Course Activated"}
                   description={"Course Activated Succcessfully"}
                 />
             )
         },
         onError:() => {
             toast.custom(
                 <ToastDanger 
                   title={"Activation Failed"}
                   description={'Failed to activate course due to an error please check internet connection and try again later'}
                 />
             )
         }
    })
}
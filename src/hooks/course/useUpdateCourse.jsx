import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCourse } from "../../services/course";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useUpdateCourse = (handleClose, courseId) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:({ courseId, updateData }) => updateCourse(courseId, updateData),
         onSuccess: () => {
            queryClient.invalidateQueries({ queryKey:["courses"] })
            queryClient.removeQueries({ queryKey:["course", courseId]})
            
            if(handleClose){
                handleClose();
            }

            toast.custom(
                <ToastSuccess 
                  title={"Update Successfull"}
                  description={"Course Successfully Updated"}
                />
            )
         },
         onError:() => {
             toast.custom(
                <ToastDanger 
                  title={"Update Failed"}
                  description={"Failed To Update Course Please Try Again"}
                />
             )
         }
    })
}
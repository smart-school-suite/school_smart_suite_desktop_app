import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCourse } from "../../services/course";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useCreateCourse = (handleClose) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:createCourse,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["courses"] })
            queryClient.invalidateQueries({ queryKey:["activeCourses"] })

            toast.custom(
                <ToastSuccess 
                  title={"Course Created"}
                  description={"Course Created Successfully"}
                />
            )

            if(handleClose){
                handleClose();
            }
         },
         onError:() => {
            toast.custom(
                <ToastDanger 
                  title={"Failed To Create Course"}
                  description={"Failed To Create Course Due to An Error Please Try Again"}
                />
            )
         }
    })
}
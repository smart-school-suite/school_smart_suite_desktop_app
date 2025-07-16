import { useMutation, useQueryClient } from "@tanstack/react-query";
import { activateTeacher } from "../../services/teacher";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";

export const useActivateTeacher = (handleClose) => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn:(teacherId) => activateTeacher(teacherId),
         onSuccess:(activatedTeacherId) => {
             queryClient.invalidateQueries({ queryKey:["teachers"] })
             queryClient.removeQueries({ queryKey: ['teacher', activatedTeacherId] })
             if(handleClose){
                handleClose();
             }

             toast.custom(
                <ToastSuccess 
                  title={"Activation Successfull"}
                  description={"Teacher Account Activated Successfully"}
                />
             )
         },
         onError:() => {
            toast.custom(
                <ToastDanger 
                   title={"Activation Failed"}
                   description={"Teacher Account Activation Failed"}
                />
            )
         }
     })
}
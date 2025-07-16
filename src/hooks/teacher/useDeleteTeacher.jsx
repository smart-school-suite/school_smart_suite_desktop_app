import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTeacher } from "../../services/teacher";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
export const useDeleteTeacher = (handleClose) => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn:deleteTeacher,
         onSuccess: (deletedTeacherId) => {
             queryClient.invalidateQueries({ queryKey:["teachers"] })
             queryClient.removeQueries({ queryKey: ['teacher', deletedTeacherId] })

            if(handleClose){
                handleClose();
            }

            toast.custom(
                <ToastSuccess 
                  title={"Teacher Deleted"}
                  description={"Teacher Deleted Successfully"}
                />
            )
         },
         onError:() => {
            toast.custom(
                <ToastDanger 
                  title={"Delete Failed"}
                  description={"Failed To Delete Teacher"}
                />
            )
         }
     })
}
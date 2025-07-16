import { deleteStudent } from "../../services/Student";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useDeleteStudent = (handleClose, studentId) => {
  const queryClient = useQueryClient();
  return useMutation({
     mutationFn: deleteStudent,
     onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['students'] })
        queryClient.removeQueries({ queryKey: ['student', studentId] })

        if(handleClose){
           handleClose();
        }

        toast.custom(
          <ToastSuccess 
            title={"Delete Successfull"}
            description={"Successfully Deleted Student"}
          />
        )
     },
     onError:() => {
        toast.custom(
          <ToastDanger 
            title={"Delete Failed"}
            description={"Failed To delete Student Due to an Error please try again"}
          />
        )
     }
  })
};
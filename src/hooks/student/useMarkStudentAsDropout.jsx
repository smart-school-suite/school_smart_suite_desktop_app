import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markStudentAsDropout } from "../../services/Student";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useMarkStudentAsDropout = (handleClose, studentId) => {
     const queryClient = useQueryClient();
     return useMutation({
        mutationFn: (studentId) => markStudentAsDropout(studentId),
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['students'] });
        queryClient.invalidateQueries({ queryKey: ['studentDropout']});
        queryClient.invalidateQueries({ queryKey: ['student', studentId] });

        if(handleClose){
            handleClose();
        }

        toast.custom(
          <ToastSuccess 
            title={"Student Marked As Dropdout"}
            description={"Student Marked As Dropout Successfully"}
          />
        )
      },
      onError:() => {
          toast.custom(
            <ToastDanger 
              title={"Failed Mark As Dropout"}
              description={"Failed to Mark Student As Dropout Please Try Again Later"}
            />
          )
      }
     });
}
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deactivateStudent } from "../../services/Student";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useDeactivateStudent = (handleClose, studentId) => {
     const queryClient = useQueryClient();
     return useMutation({
        mutationFn: (studentId) => deactivateStudent(studentId),
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['students'] });
        queryClient.invalidateQueries({ queryKey: ['students', studentId] });

        if(handleClose){
           handleClose();
        }
        toast.custom(
          <ToastSuccess 
            title={"Deactivated"}
            description={"Student Account Successfully Deactivated"}
          />
        )

      },
      onError:() => {
         toast.custom(
            <ToastDanger 
               title={"Failed Activation"}
               description={"Failed to Activate Student Account Due to an error"}
            />
         )
      }
   });
}
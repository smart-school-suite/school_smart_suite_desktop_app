import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reinstateDropOutStudent } from "../../services/Student";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useReinstateDropOutStudent = (handleClose, studentId) => {
     const queryClient = useQueryClient();
     return useMutation({
        mutationFn: (studentId) => reinstateDropOutStudent(studentId),
                onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['students'] });
                queryClient.invalidateQueries({ queryKey: ['studentDropout']});
                queryClient.invalidateQueries({ queryKey: ['student', studentId] });
          if(handleClose){
               handleClose();
          }

          toast.custom(
               <ToastSuccess 
                  title={"Student Reinstated"}
                  description={"Student Reinstated Successfully"}
               />
          )
       },
       onError:() => {
            toast.custom(
                <ToastDanger 
                  title={"Reinstation Failed"}
                  description={"Failed To Reinstate Student please try again"}
                />
            )
       }
     })
}
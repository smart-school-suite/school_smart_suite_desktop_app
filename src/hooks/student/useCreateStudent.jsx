import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createStudent } from "../../services/Student";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useCreateStudent = (handleClose) => {
      const queryClient = useQueryClient();
      return useMutation({
         mutationFn:createStudent,
         onSuccess: () => {
            queryClient.invalidateQueries({ queryKey:['students'] })
            if(handleClose){
               handleClose();
            }

            toast.custom(
               <ToastSuccess 
                 title={"Student Created"}
                 description={"Student Created Successfully"}
               />
            )
         },
         onError:() => {
            toast.custom(
               <ToastDanger 
                 title={"Failed Creation"}
                 description={"Failed To Created Student Please Try Again"}
               />
            )
         }
      })
}
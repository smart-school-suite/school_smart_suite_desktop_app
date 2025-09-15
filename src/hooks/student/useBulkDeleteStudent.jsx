import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkDeleteStudent } from "../../services/Student";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useBulkDeleteStudent = (handleClose, resetAll) => {
     const queryClient = useQueryClient();
     return useMutation({
          mutationFn:bulkDeleteStudent,
             onSuccess: () => {
            queryClient.invalidateQueries({ queryKey:['students'] })

            if(handleClose){
               handleClose();
            }

            if(resetAll){
                resetAll();
            }

            toast.custom(
                <ToastSuccess 
                  title={"Delete Successful"}
                  description={"Student Deleted Successfully"}
                />
            )
         },
         onError:() => {
            toast.custom(
                <ToastDanger 
                  title={"Delete Failed"}
                  description={"Failed to delete student due to an error please check internet connection and try again"}
                />
            )
         }
     });
}
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkDeleteExam } from "../../services/exam";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useBulkDeleteExam = (handleClose, resetAll) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:bulkDeleteExam,
         onSuccess: () => {
            queryClient.invalidateQueries({queryKey:["exams"]})
            if(handleClose){
                handleClose();
            }

            if(resetAll){
                resetAll();
            }

            toast.custom(
                 <ToastSuccess 
                   title={"Delete Successful"}
                   description={"Exam Deleted Successfully"}
                 />
            )
         },
         onError:() => {
             toast.custom(
                 <ToastDanger 
                   title={"Delete Failed"}
                   description={"Failed to delete exam due to an error please check internet connection and try again"}
                 />
             )
         }
    })
}
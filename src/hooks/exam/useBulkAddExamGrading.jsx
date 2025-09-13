import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkAddExamGradingConfigs } from "../../services/exam";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
export const useBulkAddExamGradingConfigs = (handleClose, resetAll) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:bulkAddExamGradingConfigs,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["exams"]})
            if(handleClose){
                 handleClose();
            }

            if(resetAll){
                resetAll();
            }

            toast.custom(
                 <ToastSuccess 
                   title={"Exam Grading Added"}
                   description={"Exam Grading Added Successfully"}
                 />
            )
         },
         onError:() => {
             toast.custom(
                 <ToastDanger 
                   title={"Failed to add grading"}
                   description={"Failed to add exam grading due to an error please check internet connection and try again"}
                 />
             )
         }
    })
}
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkUpdateExam } from "../../services/exam";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useBulkUpdateExam = (handleClose, resetAll) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:bulkUpdateExam,
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
                   title={"Update Successfull"}
                   description={"Exam Updated Successfully"}
                 />
            )
        },
        onError:() => {
             toast.custom( 
                <ToastDanger 
                  title={"Update Failed"}
                  description={"Update Failed Due to an error please check internet connection and try again"}
                />
             )
        }
    })
}
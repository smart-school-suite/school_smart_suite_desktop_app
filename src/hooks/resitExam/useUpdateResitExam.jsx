import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateResitExam } from "../../services/resitExam";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useUpdateResitExam = (handleClose) => {
    const queryClient = useQueryClient();
    return useMutation({ 
        mutationFn:({ resitExamId, updateData }) => updateResitExam(resitExamId, updateData),
        onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["resitExams"] })
             if(handleClose){
                handleClose();
             }

             toast.custom(
                <ToastSuccess 
                  title={"Update Succesfull"}
                  description={"Resit Exam Updated Successfully"}
                />
             )
        },
        onError:() => {
            toast.custom(
                <ToastDanger 
                  title={"Update Failed"}
                  description={"Failed to update resit exam please try again"}
                />
            )
        }
    })
}
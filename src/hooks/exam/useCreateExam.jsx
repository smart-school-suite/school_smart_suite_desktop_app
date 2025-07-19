import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createExam } from "../../services/exam";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useCreateExam = (handleClose) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:createExam,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["exams"]})
            queryClient.invalidateQueries({ queryKey:["examCandidates"] })

            if(handleClose){
                 handleClose();
            }

            toast.custom(
                <ToastSuccess 
                  title={"Exam Created"}
                  description={"Exam Created Successfully"}
                />
            )
         },
         onError:() => {
             toast.custom(
                <ToastDanger 
                  title={"Create Exam Failed"}
                  description={"Failed To Create Exam"}
                />
             )
         }
    })
}
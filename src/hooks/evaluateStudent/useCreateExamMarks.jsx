import { createExamMark } from "../../services/evaluateStudent";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastWarning from "../../components/Toast/ToastWarning";
export const useCreateExamMarks = (handleClose) => {
    const queryClient = useQueryClient();
     return useMutation({
         mutationFn:createExamMark,
         onSuccess:() => {
             
            queryClient.invalidateQueries({ queryKey:["examCandidates"] })

             if(handleClose){
                handleClose();
             }

             toast.custom(
                <ToastSuccess 
                  title={"Marks Submitted"}
                  description={"Marks Submitted Successfully"}
                />
             )
         },
         onError:() => {
             toast.custom(
                <ToastWarning 
                  title={"Failed to Submit"}
                  description={"Failed to submit Marks Please try again"}
                />
             )
         }
     })
}
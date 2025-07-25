import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addExamGrading } from "../../services/exam";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";

export const useAddExamGrading = (handleClose) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:({examId, gradesConfig}) => addExamGrading(examId, gradesConfig),
         onSuccess:() => {
             queryClient.invalidateQueries({ queryKey:["exams"] })
            
             if(handleClose){
                handleClose();
             }

             toast.custom(
                <ToastSuccess 
                  title={"Grading Added"}
                  description={"Exam Grading Added Successfully"}
                />
             )
         },
         onError:() => {
             toast.custom(
                <ToastDanger 
                  title={"Failed to Grade Exam"}
                  description={"Failed to add exam grading please try again"}
                />
             )
         }
    })
}
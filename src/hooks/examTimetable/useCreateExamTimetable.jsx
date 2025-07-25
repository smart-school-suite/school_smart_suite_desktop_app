import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTimetable } from "../../services/examTimetable";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useCreateExamTimetable = (handleClose) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:createTimetable,
         onSuccess:(examId) => {
            queryClient.removeQueries({ queryKey:["examTimetable", examId]})

            if(handleClose){
                handleClose();
            }

            toast.custom(
                <ToastSuccess 
                  title={"Time table created"}
                  description={"Exam Timetable Created Successfully"}
                />
            )
         },
         onError:() => {
             toast.custom(
                <ToastWarning 
                   title={"Failed to Create Timetable"}
                   description={"Failed To Create Exam Timetable Due to an error please try again"}
                />
             )
         }
    })
}
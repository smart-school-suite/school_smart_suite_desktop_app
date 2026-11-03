import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTimetable } from "../../services/examTimetable";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useCreateExamTimetable = (handleClose) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:({ examId, timetableData }) => createTimetable(examId, timetableData),
         onSuccess:(examId) => {
            queryClient.removeQueries({ queryKey:["examTimetable", examId]})
            queryClient.invalidateQueries({ queryKey:["exams"] })
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
    })
}
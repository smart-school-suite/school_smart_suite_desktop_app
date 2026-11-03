import { useMutation } from "@tanstack/react-query";
import { autoGenExamTimetable } from "../../services/examTimetable";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";

export const useAutoGenExamTimetable = () => {
     return useMutation({
         mutationFn:autoGenExamTimetable,
         onSuccess:() => {
             toast.custom(
                <ToastSuccess 
                  title={"Exam Timetable Generated"}
                  description={"Exam Timetable Generated Successfully"}
                />
             )
         },
     })
}
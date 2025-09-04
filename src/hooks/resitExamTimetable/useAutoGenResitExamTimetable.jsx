import { useMutation } from "@tanstack/react-query";
import { autoGenResitExamTimetable } from "../../services/resitExamTimetable";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastWarning from "../../components/Toast/ToastWarning";
export const useAutoGenResitExamTimetable = () => {
     return useMutation({
         mutationFn:autoGenResitExamTimetable,
         onSuccess:() => {
             toast.custom(
                <ToastSuccess 
                  title={"Exam Timetable Generated"}
                  description={"Exam Timetable Generated Successfully"}
                />
             )
         },
         onError:() => {
              toast.custom(
                 <ToastWarning 
                   title={"Generation Failed"}
                   description={"Failed to Generate Exam Timetable Due to An Error Please Try Again"}
                 />
             )
         }
     })
}
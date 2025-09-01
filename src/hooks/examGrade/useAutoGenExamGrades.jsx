import { useMutation } from "@tanstack/react-query";
import { autoGenExamGrades } from "../../services/examGrade";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";

export const useAutoGenExamGrades = () => {
     return  useMutation({
         mutationFn:autoGenExamGrades,
         onSuccess:() => {
             toast.custom(
                 <ToastSuccess 
                   title={"Grades Generated"}
                   description={"Exam Grades Generated Successfully"}
                 />
             )
         },
         onError:() => {
             toast.custom(
                 <ToastDanger 
                   title={"Failed Generate"}
                   description={"Failed to Generate Exam Grades Please Try Again"}
                 />
             )
         }
     })
}
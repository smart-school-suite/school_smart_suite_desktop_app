import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkUpdateExamGrades } from "../../services/examGrade";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";

export const useBulkUpdateExamGrades = (handleClose, configId) => {
    const queryClient = useQueryClient();
    return useMutation({
          mutationFn:bulkUpdateExamGrades,
          onSuccess:() => {
               queryClient.invalidateQueries({ queryKey:["gradeConfigDetails", configId]})
               if(handleClose){
                  handleClose();
               }

               toast.custom(
                 <ToastSuccess 
                   title={"Update Successfull"}
                   description={"Exam Grades Updated Successfully"}
                  />
               )
          },
          onError:() => {
               toast.custom(
                 <ToastDanger 
                   title={"Update Failed"}
                   description={"Failed to update Exam Grades Due to an error please check internet connection and try again"}
                 />
               )
          }
    })    
}
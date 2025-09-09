import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteGradeConfig } from "../../services/examGrade";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastWarning from "../../components/Toast/ToastWarning";

export const useDeleteGradeConfig = (handleClose) => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn:deleteGradeConfig,
         onSuccess:() => {
             queryClient.invalidateQueries({ queryKey:["schoolGradeCategories"] })
             toast.custom(
                 <ToastSuccess 
                   title={"Grades Deleted"}
                   description={"Grades Deleted Successfully"}
                 />
             )

             if(handleClose){
                handleClose();
             }
            
         },
         onError:() => {
             toast.custom(
                 <ToastWarning 
                   title={"Failed Delete"}
                   description={"Failed to delete grades due to an error please verify that this grade config has been configured or not already deleted and try again"}
                 />
             )
         }
     })
} 
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGradesByOtherGrades } from "../../services/examGrade";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useCreateGradesByOtherGrades = (handleClose) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:({ configId, targetConfigId }) => createGradesByOtherGrades(configId, targetConfigId),
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["schoolGradeCategories"]})

            if(handleClose){
                handleClose();
            }
            
            toast.custom(
                <ToastSuccess 
                    title={"Grades Configured"}
                    description={"School Grades Configured Successfully"}
                />
            )
         },
         onError:() => {
             <ToastDanger 
               title={"Failed Configuration"}
               description={"Failed to configure School Grades Please Try Again Later"}
             />
         }
    })
    
}
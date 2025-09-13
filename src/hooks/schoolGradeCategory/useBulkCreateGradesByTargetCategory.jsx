import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkCreateGradesByTargetCategory } from "../../services/schoolGradeCategory";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";

export const useBulkCreateGradesByTargetCategory = (handleClose) => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn:bulkCreateGradesByTargetCategory,
         onSuccess:() => {
             queryClient.invalidateQueries({ queryKey:["schoolGradeCategories"] })
            
            if(handleClose){
                handleClose();
            }

            toast.custom(
                <ToastSuccess 
                  title={"Grades Configured"}
                  description={"Grades Configured Successfully"}
                />
            )
         },
         onError:() => {
              toast.custom(
                <ToastDanger 
                  title={"Failed To Configure"}
                  description={"Failed To Configure Grades Due To An Error"}
                />
              )
         }
     })
}
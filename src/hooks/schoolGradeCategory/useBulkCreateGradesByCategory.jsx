import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkCreateGradesByCategory } from "../../services/schoolGradeCategory";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";

export const useBulkCreateGradesByCategory = (handleClose, resetAll) => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn:bulkCreateGradesByCategory,
         onSuccess:() => {
              queryClient.invalidateQueries({ queryKey:["schoolGradeCategories"] })
            
            if(handleClose){
                handleClose();
            }

            if(resetAll){
              resetAll();
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkDeleteGradesByCategory } from "../../services/schoolGradeCategory";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";

export const useBulkDeleteGradesByCategory = (handleClose) => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn:bulkDeleteGradesByCategory,
         onSuccess:() => {
             queryClient.invalidateQueries({ queryKey:["schoolGradeCategories"] })
            
            if(handleClose){
                handleClose();
            }

            toast.custom(
                <ToastSuccess 
                  title={"Grades Deleted"}
                  description={"Grades Deleted Successfully"}
                />
            )
         },
         onError:() => {
              toast.custom(
                <ToastDanger 
                  title={"Failed Deleted"}
                  description={"Failed To Delete Grades  Due To An Error Please Check Internet Connection and try again"}
                />
              )
         }
     })
}
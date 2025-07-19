import { createExpenseCategory } from "../../services/expensesCategory";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";
import toast from "react-hot-toast";
export const useCreateExpenseCategory = (handleClose) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:createExpenseCategory,
         onSuccess:() => {
            queryClient.invalidateQueries({queryKey:["expensesCategories"]})

            if(handleClose){
                handleClose();
            }

            toast.custom(
                <ToastSuccess  
                   title={"Category Created"}
                   description={"School Expenses Category Created Successfully"}
                />
            )
         },

         onError:() => {
             toast.custom(
                <ToastDanger 
                   title={"Creation Failed"}
                   description={"School Expenses Category Creation Failed Due to an Error Please try again"}
                />
             )
         }
    })
}
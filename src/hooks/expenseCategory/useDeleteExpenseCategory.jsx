import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteExpenseCategory } from "../../services/expensesCategory";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import toast from "react-hot-toast";
export const useDeleteExpenseCategory = (handleClose) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:deleteExpenseCategory,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["expensesCategories"]})

            if(handleClose){
                handleClose();
            }

            toast.custom(
                <ToastSuccess 
                   title={"Delete Successfull"}
                   description={"School Expenses Category Deleted Successfully"}
                />
            )
         },
    })
}
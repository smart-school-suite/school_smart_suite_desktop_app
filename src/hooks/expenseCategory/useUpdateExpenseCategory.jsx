import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateExpenseCategory } from "../../services/expensesCategory";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useUpdateExpenseCategory = (handleClose) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:({ categoryId, updateData }) => updateExpenseCategory(categoryId, updateData),
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["expensesCategories"]})
            if(handleClose){
                handleClose();
            }

            toast.custom(
                <ToastSuccess 
                  title={"Update Successfull"}
                  description={"Expenses Category Updated Successfully"}
                />
            )
         },
    })
}
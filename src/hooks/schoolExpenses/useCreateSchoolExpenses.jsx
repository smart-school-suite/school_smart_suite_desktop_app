import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createExpense } from "../../services/schoolExpenses";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useCreateSchoolExpense = (handleClose) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn: createExpense,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["schoolExpenses"] })

            if(handleClose){
                handleClose();
            }

            toast.custom(
                <ToastSuccess 
                   title={"Expense Created"}
                   description={"School Expense Created Successfully"}
                />
            )
         },
         onError:() => {
             toast.custom(
                <ToastDanger 
                   title={"Creation Failed"}
                   description={"Failed To Create School Expenses Due to An Error Please Try Again"}
                />
             )
         }
    })
}
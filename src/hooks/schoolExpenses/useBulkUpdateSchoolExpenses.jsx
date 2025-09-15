import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkUpdateSchoolExpenses } from "../../services/schoolExpenses";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useBulkUpdateSchoolExpenses = (handleClose) => {
    const queryClient = useQueryClient();
    return useMutation({
         mutationFn:bulkUpdateSchoolExpenses,
         onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["schoolExpenses"] })

            if(handleClose){
                handleClose();
            }

            toast.custom(
                 <ToastSuccess 
                   title={"Update Successfull"}
                   description={"School Expenses Updated Successfully"}
                 />
            )
         },
         onError:() => {
             toast.custom(
                 <ToastDanger 
                   title={"Update Failed"}
                   description={"Update Failed due to an error please check internet connection and try again"}
                 />
             )
         }
    })
}
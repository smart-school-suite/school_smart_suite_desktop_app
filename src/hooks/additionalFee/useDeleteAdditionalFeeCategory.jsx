import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAdditionalFeeCategory } from "../../services/additionalFee";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useDeleteAdditionalFeeCategory = (handleClose) => {
     const queryClient = useQueryClient();
     return useMutation({
        mutationFn:deleteAdditionalFeeCategory,
        onSuccess: () => {
             queryClient.invalidateQueries({ queryKey:["additionalFeeCategories"]})

             if(handleClose){
               handleClose();
             }

             toast.custom(
               <ToastSuccess 
                 title={"Delete Successfull"}
                 description={"Additional Fee Category Deleted Successfully"}
               />
             )
        },
        onError:() => {
           toast.custom(
               <ToastDanger 
                 title={"Delete Failed"}
                 description={"Failed to deleted additional Fee Category"}
               />
           )
        } 
     });
}
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkBillStudentAdditionalFee } from "../../services/additionalFee";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useBulkBillStudentAdditionalFee = (handleClose, resetAll) => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn: bulkBillStudentAdditionalFee,
         onSuccess: () => {
             queryClient.invalidateQueries({ queryKey:["additionalFees"] })

             if(handleClose){
                handleClose();
             }

             if(resetAll){
                resetAll();
             }

             toast.custom(
                 <ToastSuccess 
                   title={"Bill Successfull"}
                   description={"Student Billed Successfully"}
                 />
             )
         },
         onError:() => {
             toast.custom(
                 <ToastDanger 
                   title={"Failed to bill student"}
                   description={"Failed to bill student due to an error please check internet connection and try again"}
                 />
             )
         }
     });
}
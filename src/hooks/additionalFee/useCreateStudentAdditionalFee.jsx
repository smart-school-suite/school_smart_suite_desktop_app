import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createStudentAdditionalFee } from "../../services/additionalFee";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
export const useCreateStudentAdditionalFee = (handleClose) => {
     const queryClient = useQueryClient();
     return useMutation({
         mutationFn:createStudentAdditionalFee,
         onSuccess: () => {
             queryClient.invalidateQueries({ queryKey:["additionalFees"] })

             if(handleClose){
                handleClose();
             }

             toast.custom(
                <ToastSuccess 
                  title={"Additional Fee Created"}
                  description={"Additional Fee Created Successfully"}
                />
             )
         },
         onError:() => {
             toast.custom(
                <ToastDanger 
                  title={"Failed To Create Additional Fee"}
                  description={"Failed to create additional fee due to an error please try again"}
                />
             )
         }
     })
}

import { deleteRegistrationFee } from "../../services/feePayment";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastDanger from "../../components/Toast/ToastDanger";

export const useDeleteRegistrationFee = (handleClose) => {
    const queryClient = useQueryClient();
    return useMutation({
          mutationFn:deleteRegistrationFee,
          onSuccess:() => {
            queryClient.invalidateQueries({ queryKey:["registrationFees"]})

            if(handleClose){
                 handleClose();
            }
             toast.custom(
                 <ToastSuccess 
                    title={"Delete Successful"}
                    description={"Registration Fee Deleted Successfully"}
                 />
             )
          },
          onError:() => {
             toast.custom(
                 <ToastDanger 
                   title={"Delete Failed"}
                   description={"Failed to delete registration fee due to an error please check internet connection and try again"}
                 />
             )
          }
    })
}